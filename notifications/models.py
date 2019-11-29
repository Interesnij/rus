import uuid
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from common.model_loaders import get_user_model, get_community_model
from django.db import models
from django.utils import timezone
from django.conf import settings
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from slugify import slugify
from django.core import serializers
from django.contrib.postgres.indexes import BrinIndex


class NotificationQuerySet(models.query.QuerySet):

    def unread(self):
        return self.filter(unread=True)

    def read(self):
        return self.filter(unread=False)

    def mark_all_as_read(self, recipient=None):
        qs = self.unread()
        if recipient:
            qs = qs.filter(recipient=recipient)

        return qs.update(unread=False)

    def mark_all_as_unread(self, recipient=None):
        qs = self.read()
        if recipient:
            qs = qs.filter(recipient=recipient)

        return qs.update(unread=True)

    def serialize_latest_notifications(self, recipient=None):
        qs = self.unread()[:5]
        if recipient:
            qs = qs.filter(recipient=recipient)[:5]

        notification_dic = serializers.serialize("json", qs)
        return notification_dic

    def get_most_recent(self, recipient=None):
        qs = self.unread()[:5]
        if recipient:
            qs = qs.filter(recipient=recipient)[:5]
        return qs



class Notification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications', verbose_name="Получатель")
    actor = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="notify_actor", verbose_name="Инициатор", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now, editable=False, db_index=True, verbose_name="Создано")
    unread  = models.BooleanField(default=True, db_index=True)

    POST_COMMENT = 'PC'
    POST_COMMENT_REPLY = 'PCR'
    CONNECTION_REQUEST = 'CR'
    CONNECTION_CONFIRMED = 'CC'
    COMMUNITY_INVITE = 'CI'
    POST_USER_MENTION = 'PUM'
    POST_COMMENT_USER_MENTION = 'PCUM'
    LOGGED_IN = 'I'
    LOGGED_OUT = 'O'
    SIGNUP = 'U'
    REPOST = 'R'

    LIKE = 'L'
    DISLIKE = 'D'
    REPLY_COMMENT_LIKE = 'RCL'
    REPLY_COMMENT_DISLIKE = 'RCD'
    LIKE_COMMENT =  'LC'
    DISLIKE_COMMENT =  'DC'

    NOTIFICATION_TYPES = (
        (POST_COMMENT, 'оставил комментарий'),
        (POST_COMMENT_REPLY, 'ответил на Ваш комментарий к записи'),
        (CONNECTION_REQUEST, 'подал заявку в друзья'),
        (CONNECTION_CONFIRMED, 'подтвердил, что он Ваш друг'),
        (COMMUNITY_INVITE, 'пригласил Вас в сообщество'),
        (POST_USER_MENTION, 'упомянул Вас в записи'),
        (POST_COMMENT_USER_MENTION, 'упомянул Вас в комментарии к записи'),
        (LIKE, 'понравился Ваш пост'),
        (DISLIKE, 'не понравился Ваш пост'),
        (LIKE_COMMENT, 'понравился Ваш комментарий'),
        (DISLIKE_COMMENT, 'не понравился Ваш комментарий'),
        (LIKE_REPLY_COMMENT, 'понравился Ваш ответ к комментарию'),
        (DISLIKE_REPLY_COMMENT, 'не понравился Ваш ответ к комментарию'),
        (SIGNUP, 'создал аккаунт'),
        (REPOST, 'поделился Вашей записью'),
    )

    verb = models.CharField(max_length=5, choices=NOTIFICATION_TYPES, verbose_name="Тип уведомления")
    slug = models.SlugField(max_length=210, null=True, blank=True)
    action_object_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    action_object_object_id = models.CharField(max_length=50, blank=True, null=True)
    action_object = GenericForeignKey("action_object_content_type", "action_object_object_id")
    uuid_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    objects = NotificationQuerySet.as_manager()

    class Meta:
        verbose_name = "Уведомление"
        verbose_name_plural = "Уведомления"
        ordering = ["-timestamp"]
        indexes = (
            BrinIndex(fields=['timestamp']),
        )

    def __str__(self):
        return '{} - {}'.format(self.actor, self.get_verb_display())


    def time_since(self, now=None):
        from django.utils.timesince import timesince

        return timesince(self.timestamp, now)

    def mark_as_unread(self):
        if not self.unread:
            self.unread = True
            self.save()


def notification_handler(actor, recipient, verb, **kwargs):

    key = kwargs.pop('key', 'notification')
    id_value = kwargs.pop('id_value', None)
    if recipient == 'global':
        users = User.objects.all().exclude(username=actor.username)
        for user in users:
            Notification.objects.create(
                actor=actor,
                recipient=user,
                verb=verb,
                action_object=kwargs.pop('action_object', None)
            )
        notification_broadcast(actor, key)

    elif isinstance(recipient, list):
        for user in recipient:
            Notification.objects.create(
                actor=actor,
                recipient=User.objects.get(username=user.username),
                verb=verb,
                action_object=kwargs.pop('action_object', None)
            )

    elif isinstance(recipient, get_user_model()):
        Notification.objects.create(
            actor=actor,
            recipient=recipient,
            verb=verb,
            action_object=kwargs.pop('action_object', None)
        )
        notification_broadcast(
            actor, key, id_value=id_value, recipient=recipient.username)

    else:
        pass


class CommunityNotification(models.Model):
    recipient = models.ForeignKey('communities.Community', on_delete=models.CASCADE, related_name='community_notifications', verbose_name="Сообщество")
    actor = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="notification_actor", verbose_name="Инициатор", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now, editable=False, db_index=True, verbose_name="Создано")
    unread  = models.BooleanField(default=True, db_index=True)

    POST_COMMENT = 'PC'
    POST_COMMENT_REPLY = 'PCR'
    CONNECTION_REQUEST = 'CR'
    CONNECTION_CONFIRMED = 'CC'
    COMMUNITY_INVITE = 'CI'
    POST_USER_MENTION = 'PUM'
    POST_COMMENT_USER_MENTION = 'PCUM'
    LOGGED_IN = 'I'
    LOGGED_OUT = 'O'
    SIGNUP = 'U'
    REPOST = 'R'
    JOIN = 'J'

    (LIKE, 'понравился Ваш пост'),
    (DISLIKE, 'не понравился Ваш пост'),
    (LIKE_COMMENT, 'понравился Ваш комментарий'),
    (DISLIKE_COMMENT, 'не понравился Ваш комментарий'),
    (LIKE_REPLY_COMMENT, 'понравился Ваш ответ к комментарию'),
    (DISLIKE_REPLY_COMMENT, 'не понравился Ваш ответ к комментарию'),
    (SIGNUP, 'создал аккаунт'),
    (REPOST, 'поделился Вашей записью'),

    NOTIFICATION_TYPES = (
        (POST_COMMENT, 'оставил комментарий к записи сообщества'),
        (POST_COMMENT_REPLY, 'ответил на комментарий к записи сообщества'),
        (CONNECTION_REQUEST, 'подал заявку в сообщество'),
        (CONNECTION_CONFIRMED, 'заявка в сообщество одобрено'),
        (COMMUNITY_INVITE, 'пригласил сообщество в сообщество'),
        (POST_USER_MENTION, 'упомянул сообщество в записи'),
        (POST_COMMENT_USER_MENTION, 'упомянул сообщество в комментарии к записи'),
        (LIKE, 'понравилась запись сообщества'),
        (DISLIKE, 'не понравилась запись сообщества'),
        (LIKE_COMMENT, 'понравился комментарий сообщества'),
        (DISLIKE_COMMENT, 'не понравился комментарий сообщества'),
        (LIKE_REPLY_COMMENT, 'понравился ответ к комментарию сообщества'),
        (DISLIKE_REPLY_COMMENT, 'не понравился ответ к комментарию сообщества'),
        (REPOST, 'поделился записью сообщества'),
        (JOIN, 'вступил в сообщество'),
    )

    verb = models.CharField(max_length=5, choices=NOTIFICATION_TYPES, verbose_name="Тип уведомления")
    slug = models.SlugField(max_length=210, null=True, blank=True)
    action_object_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    action_object_object_id = models.CharField(max_length=50, blank=True, null=True)
    action_object = GenericForeignKey("action_object_content_type", "action_object_object_id")
    uuid_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    objects = NotificationQuerySet.as_manager()

    class Meta:
        verbose_name = "Уведомление сообщества"
        verbose_name_plural = "Уведомления сообщества"
        ordering = ["-timestamp"]
        indexes = (
            BrinIndex(fields=['timestamp']),
        )

    def __str__(self):
        return '{} - {}'.format(self.actor, self.get_verb_display())


    def time_since(self, now=None):
        from django.utils.timesince import timesince

        return timesince(self.timestamp, now)

    def mark_as_unread(self):
        if not self.unread:
            self.unread = True
            self.save()


def community_notification_handler(actor, recipient, verb, **kwargs):

    key = kwargs.pop('key', 'notification')
    id_value = kwargs.pop('id_value', None)
    if recipient == 'global':
        users = User.objects.all().exclude(username=actor.username)
        for user in users:
            CommunityNotification.objects.create(
                actor=actor,
                recipient=user,
                verb=verb,
                action_object=kwargs.pop('action_object', None)
            )
        notification_broadcast(actor, key)

    elif isinstance(recipient, list):
        for community in recipient:
            CommunityNotification.objects.create(
                actor=actor,
                recipient=Community.objects.get(name=community.name),
                verb=verb,
                action_object=kwargs.pop('action_object', None)
            )

    elif isinstance(recipient, get_community_model()):
        CommunityNotification.objects.create(
            actor=actor,
            recipient=recipient,
            verb=verb,
            action_object=kwargs.pop('action_object', None)
        )
        notification_broadcast(
            actor, key, id_value=id_value, recipient=recipient.name)

    else:
        pass


def notification_broadcast(actor, key, **kwargs):
    channel_layer = get_channel_layer()
    id_value = kwargs.pop('id_value', None)
    recipient = kwargs.pop('recipient', None)
    payload = {
            'type': 'receive',
            'key': key,
            'actor_name': actor.get_full_name(),
            'id_value': id_value,
            'recipient': recipient
        }
    async_to_sync(channel_layer.group_send)('notifications', payload)

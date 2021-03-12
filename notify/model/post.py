from django.db import models
from django.utils import timezone
from django.conf import settings
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.core import serializers
from django.contrib.postgres.indexes import BrinIndex
from django.utils.formats import localize


class PostNotify(models.Model):
    COMMENT, WOMEN_COMMENT, GROUP_COMMENT = 'C', 'WC', 'GC'
    REPLY, WOMEN_REPLY, GROUP_REPLY = 'R', 'WR', 'GR'
    USER_MENTION, WOMEN_MENTION, GROUP_MENTION = 'PUM', 'WPUM', 'GPUM'
    COMMENT_USER_MENTION, WOMEN_COMMENT_USER_MENTION, GROUP_COMMENT_USER_MENTION = 'PCUM', 'WPCUM', 'GPCUM'
    LIKE, WOMEN_LIKE, GROUP_LIKE = 'L', 'WL', 'GL'
    DISLIKE, WOMEN_DISLIKE, GROUP_DISLIKE = 'D', 'WD', 'GD'
    LIKE_REPLY, WOMEN_LIKE_REPLY, GROUP_LIKE_REPLY = 'LR', 'WLR', 'GLR'
    DISLIKE_REPLY, WOMEN_DISLIKE_REPLY, GROUP_DISLIKE_REPLY = 'DR', 'WDR', 'GDR'
    LIKE_COMMENT, WOMEN_LIKE_COMMENT, GROUP_LIKE_COMMENT =  'LC', 'WLC', 'GLC'
    DISLIKE_COMMENT, WOMEN_DISLIKE_COMMENT, GROUP_DISLIKE_COMMENT =  'DC', 'WDC', 'GDC'

    REPOST, WOMEN_REPOST, GROUP_REPOST = 'RE', 'WRE', 'GRE'
    COMMUNITY_REPOST, WOMEN_COMMUNITY_REPOST, GROUP_COMMUNITY_REPOST = 'CR', 'WCR', 'GCR'

    NOTIFICATION_TYPES = (
        (COMMENT, 'оставил комментарий к записи'),
        (REPLY, 'ответил на Ваш комментарий к записи'),
        (USER_MENTION, 'упомянул Вас в записи'),
        (COMMENT_USER_MENTION, 'упомянул Вас в комментарии к записи'),
        (LIKE, 'оценил Вашу запись'),
        (DISLIKE, 'не оценил Вашу запись'),
        (LIKE_COMMENT, 'оценил Ваш комментарий к записи'),
        (DISLIKE_COMMENT, 'не оценил Ваш комментарий к записи'),
        (LIKE_REPLY, 'оценил Ваш ответ на комментарий к записи'),
        (DISLIKE_REPLY, 'не оценил Ваш ответ к комментарий к записи'),

        (REPOST, 'поделился Вашей записью'),
        (COMMUNITY_REPOST, 'поделилось Вашей записью'),
    )

    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='post_notifications', verbose_name="Получатель")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Инициатор", on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now, editable=False, verbose_name="Создано")
    unread  = models.BooleanField(default=True)
    verb = models.CharField(max_length=5, choices=NOTIFICATION_TYPES, verbose_name="Тип уведомления")
    post = models.ForeignKey('posts.Post', null=True, blank=True, on_delete=models.CASCADE)
    post_comment = models.ForeignKey('posts.PostComment', blank=True, null=True, on_delete=models.CASCADE)
    community = models.ForeignKey('communities.Community', blank=True, null=True, on_delete=models.CASCADE, verbose_name="Сообщество")

    user_set = models.ForeignKey('self', related_name='user_post_user_set', on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Например, человек лайкает несколько постов. Нужно для группировки")
    object_set = models.ForeignKey('self', related_name='user_post_object_set', on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Например, несколько человек лайкает пост. Нужно для группировки")

    class Meta:
        verbose_name = "Уведомление - записи пользователя"
        verbose_name_plural = "Уведомления - записи пользователя"
        ordering = ["-created"]
        indexes = (BrinIndex(fields=['created']),)

    def __str__(self):
        if self.community:
            return '{} {}'.format(self.community, self.get_verb_display())
        else:
            return '{} {}'.format(self.creator, self.get_verb_display())

    def get_user_set(self):
        return PostNotify.objects.filter(user_set_id=self.pk).all()

    def count_user_set(self):
        return PostNotify.objects.filter(user_set_id=self.pk).values("pk").count()

    def get_post_set(self):
        return PostNotify.objects.filter(post_set_id=self.pk).all()

    def count_post_set(self):
        return PostNotify.objects.filter(post_set_id=self.pk).values("pk").count()

    def show_current_notify(self):
        if self.user_set:
            return self.get_user_set().first()
        elif self.post_set:
            return self.get_post_set().first()
        else:
            return self

    def get_created(self):
        from django.contrib.humanize.templatetags.humanize import naturaltime
        return naturaltime(self.created)

    def get_info(self):
        if self.post.text:
            return self.post.text[:50]
        else:
            return "от " + str(localize(self.post.created))

    def get_svg(self):
        if self.verb == "L" or self.verb == "LC" or self.verb == "LRC":
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>'
        elif self.verb == "D" or self.verb == "D" or self.verb == "DRC":
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"/></svg>'
        elif self.verb == "PC" or self.verb == "PCR":
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>'
        elif self.verb == PostNotify.REPOST or self.verb == PostNotify.COMMUNITY_REPOST:
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>'
        else:
            return ''

    @classmethod
    def notify_unread(cls, user_pk):
        cls.objects.filter(recipient_id=user_pk, unread=True).update(unread=False)


class PostCommunityNotify(models.Model):
    COMMENT = 'C'
    REPLY = 'R'
    USER_MENTION = 'UM'
    COMMENT_USER_MENTION = 'CUM'
    LIKE = 'L'
    DISLIKE = 'D'
    LIKE_REPLY = 'LR'
    DISLIKE_REPLY = 'DR'
    LIKE_COMMENT =  'LC'
    DISLIKE_COMMENT =  'DC'

    REPOST = 'RE'
    COMMUNITY_REPOST = 'CR'

    NOTIFICATION_TYPES = (
        (COMMENT, 'написал комментарий к записи'),
        (REPLY, 'ответил на комментарий к записи'),
        (USER_MENTION, 'упомянул сообщество в записи'),
        (COMMENT_USER_MENTION, 'упомянул сообщество в комментарии к записи'),
        (LIKE, 'оценил запись'),
        (DISLIKE, 'не оценил запись'),
        (LIKE_COMMENT, 'оценил комментарий к записи'),
        (DISLIKE_COMMENT, 'не оценил комментарий к записи'),
        (LIKE_REPLY, 'оценил Ваш ответ на комментарий к записи'),
        (DISLIKE_REPLY, 'не оценил Ваш ответ к комментарий к записи'),

        (REPOST, 'поделился записью'),
        (COMMUNITY_REPOST, 'поделилось записью'),
    )

    community = models.ForeignKey('communities.Community', on_delete=models.CASCADE, related_name='post_community_notifications', verbose_name="Сообщество")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Инициатор", on_delete=models.CASCADE)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='community_post_recipient', verbose_name="Получатель")
    created = models.DateTimeField(default=timezone.now, editable=False, verbose_name="Создано")
    unread  = models.BooleanField(default=True)
    verb = models.CharField(max_length=5, choices=NOTIFICATION_TYPES, verbose_name="Тип уведомления")
    post = models.ForeignKey('posts.Post', null=True, blank=True, on_delete=models.CASCADE)
    post_comment = models.ForeignKey('posts.PostComment', null=True, blank=True, on_delete=models.CASCADE)
    community_creator = models.ForeignKey('communities.Community', null=True, blank=True, on_delete=models.CASCADE, verbose_name="Сообщество")

    user_set = models.ForeignKey('self', related_name='community_post_user_set', on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Например, человек лайкает несколько постов. Нужно для группировки")
    object_set = models.ForeignKey('self', related_name='community_post_object_set', on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Например, несколько человек лайкает пост. Нужно для группировки")

    class Meta:
        verbose_name = "Уведомление - записи сообщества"
        verbose_name_plural = "Уведомления - записи сообщества"
        ordering = ["-created"]
        indexes = (BrinIndex(fields=['created']),)

    def __str__(self):
        if self.community_creator:
            return '{} {}'.format(self.community_creator, self.get_verb_display())
        else:
            return '{} {}'.format(self.creator, self.get_verb_display())

    @classmethod
    def notify_unread(cls, community_pk, user_pk):
        cls.objects.filter(community_id=community_pk, recipient_id=user_pk, unread=True).update(unread=False)

    def get_created(self):
        from django.contrib.humanize.templatetags.humanize import naturaltime
        return naturaltime(self.created)

    def get_user_set(self):
        return PostNotify.objects.filter(user_set_id=self.pk).all()

    def count_user_set(self):
        return PostNotify.objects.filter(user_set_id=self.pk).values("pk").count()

    def get_post_set(self):
        return PostNotify.objects.filter(post_set_id=self.pk).all()

    def count_post_set(self):
        return PostNotify.objects.filter(post_set_id=self.pk).values("pk").count()

    def show_current_notify(self):
        if self.user_set:
            return self.get_user_set().first()
        elif self.post_set:
            return self.get_post_set().first()
        else:
            return self

    def get_svg(self):
        if self.verb == "L" or self.verb == "LC" or self.verb == "LRC":
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>'
        elif self.verb == "D" or self.verb == "D" or self.verb == "DRC":
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"/></svg>'
        elif self.verb == "PC" or self.verb == "PCR":
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>'
        elif self.verb == PostCommunityNotify.REPOST or self.verb == PostCommunityNotify.COMMUNITY_REPOST:
            return '<svg fill="currentColor" class="svg_default" style="position:absolute;width:25px" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>'
        else:
            return ''


def post_notification_handler(creator, recipient, post, verb):
    """ Сохранение уведомления о событиях записей пользователя.
        Мы создаём группы уведомлений по сегодняшнему дню, исключая случаи, когда creator != recipient:
        1. По сегодняшнему дню фильтруем записи уведомлений постов. Если есть запись, которую создал
        creator, а получатель её recipient, и verb совпадает с verb этой записи, значит создаём новую запись с прикреплением её
        к найденной записи. Это пример уведомлений "Тот-то оценил 2 Ваши записи".
        2. Если записи нет, тогда снова ищем, но только по совпадению "получатель её recipient, и verb совпадает с verb" за
        сегодняший день. Если запись есть, то создаем новую и прицепляем к ней. Это пример уведомлений
        "Тот-то и тот-то оценили пост" или "Тот-то и ещё 7 человек оценили пост".
        3. Если ни той, ни той записи нет, тогда просто создаем новую запись. Пример уведомлений
        "Тот-то оценил Ваш пост".
    """
    from datetime import date
    today = date.today()

    if PostNotify.objects.filter(creator_id=creator.pk, recipient_id=recipient.pk, created__gt=today, verb=verb).exclude(creator_id=recipient.pk).exists():
        notify = PostNotify.objects.get(creator_id=creator.pk, recipient_id=recipient.pk, created__gt=today, verb=verb)
        PostNotify.objects.create(creator=creator, recipient=recipient, post=post, verb=verb, object_set=notify)
    elif PostNotify.objects.filter(recipient_id=recipient.pk, created__gt=today, verb=verb).exclude(creator_id=recipient.pk).exists():
        notify = PostNotify.objects.get(recipient_id=recipient.pk, created__gt=today, verb=verb)
        PostNotify.objects.create(creator=creator, recipient=recipient, post=post, verb=verb, user_set=notify)
    else:
        PostNotify.objects.create(creator=creator, recipient=recipient, post=post, verb=verb)
    channel_layer = get_channel_layer()
    payload = {
            'type': 'receive',
            'key': 'notification',
            'recipient_id': recipient.pk,
            'post_id': str(post.uuid),
            'name': "u_post_notify",
        }
    async_to_sync(channel_layer.group_send)('notification', payload)

def post_comment_notification_handler(creator, comment, verb, name):
    PostNotify.objects.create(creator=creator, recipient=comment.commenter, verb=verb)
    if comment.parent_comment:
        post_uuid = comment.parent_comment.post.uuid
    else:
        post_uuid = comment.post.uuid
    channel_layer = get_channel_layer()
    payload = {
            'type': 'receive',
            'key': key,
            'recipient_id': recipient.pk,
            'comment_id': comment.pk,
            'post_id': str(post_uuid),
            'name': name,
        }
    async_to_sync(channel_layer.group_send)('notification', payload)

def post_repost_notification_handler(creator, recipient, community, post, verb):
    PostNotify.objects.create(creator=creator, recipient=recipient, community=community, post=post, verb=verb)
    channel_layer = get_channel_layer()
    payload = {
            'type': 'receive',
            'key': 'notification',
            'recipient_id': recipient.pk,
            'post_id': str(post.uuid),
            'name': "u_post_repost_notify",
        }
    async_to_sync(channel_layer.group_send)('notification', payload)



def post_community_notification_handler(creator, community, post, verb):
    persons = community.get_staff_members()
    for user in persons:
        if creator.pk != user.pk:
            PostCommunityNotify.objects.create(creator=creator, community=community, post=post, recipient=user, verb=verb)
            channel_layer = get_channel_layer()
            payload = {
                'type': 'receive',
                'key': 'notification',
                'recipient_id': user.pk,
                'community_id': community.pk,
                'post_id':  str(post.uuid),
                'name': "c_post_notify",
            }
            async_to_sync(channel_layer.group_send)('notification', payload)

def post_community_comment_notification_handler(creator, community, comment, verb, name):
    persons = community.get_staff_members()
    if comment.parent_comment:
        post_uuid = comment.parent_comment.post.uuid
    else:
        post_uuid = comment.post.uuid
    for user in persons:
        if creator.pk != user.pk:
            PostCommunityNotify.objects.create(creator=creator, community=community, comment=comment, recipient=user, verb=verb)
            channel_layer = get_channel_layer()
            payload = {
                'type': 'receive',
                'key': 'notification',
                'recipient_id': user.pk,
                'community_id': community.pk,
                'post_id': str(post_uuid),
                'name': name,
            }
            async_to_sync(channel_layer.group_send)('notification', payload)

def post_repost_community_notification_handler(creator, community, community_creator, post, verb):
    persons = community.get_staff_members()
    for user in persons:
        if creator.pk != user.pk:
            PostCommunityNotify.objects.create(creator=creator, community=community, community_creator=community_creator, post=post, recipient=user, verb=verb)
            channel_layer = get_channel_layer()
            payload = {
                'type': 'receive',
                'key': 'notification',
                'recipient_id': user.pk,
                'community_id': community.pk,
                'post_id':  str(post.uuid),
                'name': "c_post_repost_notify",
            }
            async_to_sync(channel_layer.group_send)('notification', payload)

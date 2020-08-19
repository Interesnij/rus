import uuid
from users.models import User
from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


class MessageQuerySet(models.query.QuerySet):
    """Personalized queryset created to improve model usability."""

    def get_conversation(self, sender, recipient):
        """Возвращает все сообщения, отправленные между двумя пользователями."""
        qs_one = self.filter(sender=sender, recipient=recipient)
        qs_two = self.filter(sender=recipient, recipient=sender)
        return qs_one.union(qs_two).order_by('created')

    def get_most_recent_conversation(self, recipient):
        """Возвращает имя пользователя самого последнего собеседника."""
        try:
            qs_sent = self.filter(sender=recipient)
            qs_recieved = self.filter(recipient=recipient)
            qs = qs_sent.union(qs_recieved).latest("created")
            if qs.sender == recipient:
                return qs.recipient

            return qs.sender

        except self.model.DoesNotExist:
            return User.objects.get(id=recipient.id)

    def mark_conversation_as_read(self, sender, recipient):
        """Отметьте как прочитанные все непрочитанные элементы в текущем разговоре."""
        qs = self.filter(sender=sender, recipient=recipient)
        return qs.update(unread=False)


class Message(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sent_messages',verbose_name="Sender", null=True, on_delete=models.SET_NULL)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='received_messages', null=True,blank=True, verbose_name="Recipient", on_delete=models.SET_NULL)
    created = models.DateTimeField(auto_now_add=True)
    message = models.TextField(max_length=1000, blank=True)
    unread = models.BooleanField(default=True, db_index=True)
    objects = MessageQuerySet.as_manager()

    post = models.ManyToManyField("posts.Post", blank=True, related_name='post_message')
    photo = models.ManyToManyField("gallery.Photo", blank=True, related_name='photo_message')
    photo_album = models.ManyToManyField("gallery.Album", blank=True, related_name='photo_album_message')
    good = models.ManyToManyField("goods.Good", blank=True, related_name='good_message')
    music = models.ManyToManyField("music.SoundCloudParsing", blank=True, related_name='music_message')
    music_list = models.ManyToManyField("music.SoundList", blank=True, related_name='music_list_message')
    video = models.ManyToManyField("video.Video", blank=True, related_name='video_message')
    video_list = models.ManyToManyField("video.VideoAlbum", blank=True, related_name='video_list_message')

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        ordering = "-created",

    def __str__(self):
        return self.message

    def mark_as_read(self):
        """Method to mark a message as read."""
        if self.unread:
            self.unread = False
            self.save()

    @staticmethod
    def send_message(sender, recipient, message):
        new_message = Message.objects.create(
            sender=sender,
            recipient=recipient,
            message=message
        )
        channel_layer = get_channel_layer()
        payload = {
                'type': 'receive',
                'key': 'message',
                'message_id': new_message.uuid,
                'sender': sender,
                'recipient': recipient
            }
        async_to_sync(channel_layer.group_send)(recipient.username, payload)
        return new_message

    def get_created(self):
        from django.contrib.humanize.templatetags.humanize import naturaltime
        return naturaltime(self.created)

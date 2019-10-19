from django.db import models
from users.models import User
from goods.helpers import upload_to_good_image_directory
from pilkit.processors import ResizeToFill, ResizeToFit
from imagekit.models import ProcessedImageField
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from notifications.models import Notification, notification_handler
from django.utils import timezone
from django.conf import settings
from goods.helpers import upload_to_good_image_directory
from django.contrib.postgres.indexes import BrinIndex
from main.models import Item
import uuid


class GoodCategory(models.Model):
	name=models.CharField(max_length=100, verbose_name="Название категории")
	order=models.PositiveSmallIntegerField(default=0, verbose_name="Порядковый номер")
	image=models.ImageField(blank=True, verbose_name="Изображение", upload_to="goods/list")

	def __str__(self):
		return self.name

	class Meta:
		ordering=["order","name"]
		verbose_name="категория товаров"
		verbose_name_plural="категории товаров"


class GoodSubCategory(models.Model):
	name=models.CharField(max_length=100, verbose_name="Название подкатегории")
	order=models.PositiveSmallIntegerField(default=0, verbose_name="Порядковый номер подкатегории")
	category=models.ForeignKey(GoodCategory, on_delete=models.CASCADE, verbose_name="Категория-родитель")
	image=models.ImageField(blank=True, verbose_name="Изображение", upload_to="sub_category/list")

	def __str__(self):
		return self.name

class Good(models.Model):

	class Meta:
		verbose_name="Товар"
		verbose_name_plural="Товары"

	uuid = models.UUIDField(default=uuid.uuid4, db_index=True,verbose_name="uuid")
    comments_enabled = models.BooleanField(default=True, verbose_name="Разрешить комментарии")
    community = models.ForeignKey('communities.Community', db_index=False, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Сообщество")
    created = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Создан")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, db_index=False, on_delete=models.CASCADE, verbose_name="Создатель")
    is_deleted = models.BooleanField(default=False, verbose_name="Удалено")
    views=models.IntegerField(default=0, verbose_name="Просмотры")
    moderated_object = GenericRelation('moderation.ModeratedObject', related_query_name='items')
	title = models.CharField(max_length=200, verbose_name="Название")
	description = models.TextField(max_length=1000, verbose_name="Описание товара")
	price = models.PositiveIntegerField(default=0, verbose_name="Цена товара")
	sub_category = models.ForeignKey(GoodSubCategory, on_delete=models.CASCADE, verbose_name="Подкатегория")
	image = ProcessedImageField(verbose_name='Главное изображение', format='JPEG',options={'quality': 80}, processors=[ResizeToFill(1024, upscale=False)],upload_to=upload_to_good_image_directory)
	image2 = ProcessedImageField(verbose_name='Изображение 2', blank=False, null=True, format='JPEG', options={'quality': 80}, processors=[ResizeToFill(1024, upscale=False)],upload_to=upload_to_good_image_directory)
	image3 = ProcessedImageField(verbose_name='Изображение 3', blank=False, null=True, format='JPEG', options={'quality': 80}, processors=[ResizeToFill(1024, upscale=False)],upload_to=upload_to_good_image_directory)
	image4 = ProcessedImageField(verbose_name='Изображение 4', blank=False, null=True, format='JPEG', options={'quality': 80}, processors=[ResizeToFill(1024, upscale=False)], upload_to=upload_to_good_image_directory)
	image5 = ProcessedImageField(verbose_name='Изображение 5', blank=False, null=True, format='JPEG', options={'quality': 80}, processors=[ResizeToFill(1024, upscale=False)], upload_to=upload_to_good_image_directory)
	image6 = ProcessedImageField(verbose_name='Изображение 6', blank=False, null=True, format='JPEG', options={'quality': 80}, processors=[ResizeToFill(1024, upscale=False)], upload_to=upload_to_good_image_directory)
	image7 = ProcessedImageField(verbose_name='Изображение 7', blank=False, null=True, format='JPEG', options={'quality': 80}, processors=[ResizeToFill(1024, upscale=False)], upload_to=upload_to_good_image_directory)

	def __str__(self):
		return self.title

	def notification_like(self, user):
		notification_handler(user, self.creator,Notification.LIKED, action_object=self,id_value=str(self.uuid),key='social_update')

	def notification_dislike(self, user):
		notification_handler(user, self.creator,Notification.DISLIKED, action_object=self,id_value=str(self.uuid),key='social_update')

	def notification_comment(self, user):
		notification_handler(user, self.creator,Notification.POST_COMMENT, action_object=self,id_value=str(self.uuid),key='notification')

	def save(self, *args, **kwargs):
		super().save(*args, **kwargs)
		channel_layer = get_channel_layer()
		payload = {"type": "receive","key": "additional_post","actor_name": self.creator.get_full_name()}
		async_to_sync(channel_layer.group_send)('notifications', payload)

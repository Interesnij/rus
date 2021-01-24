from django.db import models
from django.conf import settings
from django.contrib.postgres.indexes import BrinIndex


class UserNumbers(models.Model):
    DESCTOP, PHONE = 'De', 'Ph'
    DEVICE = ((DESCTOP, 'Комп'),(PHONE, 'Телефон'),)

    visitor = models.PositiveIntegerField(default=0, verbose_name="Кто заходит")
    target = models.PositiveIntegerField(default=0, verbose_name="К кому заходит")
    device = models.CharField(max_length=5, choices=DEVICE, default=DESCTOP, blank=True, verbose_name="Оборудование")
    created = models.DateField(auto_now_add=True, auto_now=False, verbose_name="Создано")

    class Meta:
        indexes = (BrinIndex(fields=['created']),)
        verbose_name = "Кто к кому заходил"
        verbose_name_plural = "Кто к кому заходил"


class CommunityNumbers(models.Model):
    DESCTOP, PHONE = 'De', 'Ph'
    DEVICE = ((DESCTOP, 'Комп'),(PHONE, 'Телефон'),)

    user = models.PositiveIntegerField(default=0, verbose_name="Кто заходит")
    community = models.PositiveIntegerField(default=0, verbose_name="В какое сообщество заходил")
    device = models.CharField(max_length=5, choices=DEVICE, default=DESCTOP, blank=True, verbose_name="Оборудование")
    created = models.DateField(auto_now_add=True, auto_now=False, verbose_name="Создано")

    class Meta:
        indexes = (BrinIndex(fields=['created']),)
        verbose_name = "Посещение сообщества"
        verbose_name_plural = "Посещения сообщества"

    @classmethod
    def get_ordered_distinct(user_id):
        return cls.objects.filter(user=user_id).distinct('community')


class GoodNumbers(models.Model):
    DESCTOP, PHONE = 'De', 'Ph'
    DEVICE = ((DESCTOP, 'Комп'),(PHONE, 'Телефон'),)

    user = models.PositiveIntegerField(default=0, verbose_name="Кто смотрит")
    good = models.PositiveIntegerField(default=0, verbose_name="Какой товар смотрит")
    device = models.CharField(max_length=5, choices=DEVICE, default=DESCTOP, blank=True, verbose_name="Оборудование")
    created = models.DateField(auto_now_add=True, auto_now=False, verbose_name="Создано")

    class Meta:
        indexes = (BrinIndex(fields=['created']),)
        verbose_name = "Посещение товара"
        verbose_name_plural = "Посещения товара"


class VideoNumbers(models.Model):
    DESCTOP, PHONE = 'De', 'Ph'
    DEVICE = ((DESCTOP, 'Комп'),(PHONE, 'Телефон'),)

    user = models.PositiveIntegerField(default=0, verbose_name="Кто смотрит")
    video = models.PositiveIntegerField(default=0, verbose_name="Какой ролик смотрит")
    device = models.CharField(max_length=5, choices=DEVICE, default=DESCTOP, blank=True, verbose_name="Оборудование")
    created = models.DateField(auto_now_add=True, auto_now=False, verbose_name="Создано")

    class Meta:
        indexes = (BrinIndex(fields=['created']),)
        verbose_name = "Просмотр ролика"
        verbose_name_plural = "Просмотры ролика"


class MusicNumbers(models.Model):
    DESCTOP, PHONE = 'De', 'Ph'
    DEVICE = ((DESCTOP, 'Комп'),(PHONE, 'Телефон'),)

    user = models.PositiveIntegerField(default=0, verbose_name="Кто слушает")
    music = models.PositiveIntegerField(default=0, verbose_name="Какой трек слушает")
    created = models.DateField(auto_now_add=True, auto_now=False, verbose_name="Создано")
    device = models.CharField(max_length=5, choices=DEVICE, default=DESCTOP, blank=True, verbose_name="Оборудование")

    class Meta:
        indexes = (BrinIndex(fields=['created']),)
        verbose_name = "Прослушивание трека"
        verbose_name_plural = "Прослушивания трека"


class PostNumbers(models.Model):
    DESCTOP, PHONE = 'De', 'Ph'
    DEVICE = ((DESCTOP, 'Комп'),(PHONE, 'Телефон'),)

    user = models.PositiveIntegerField(default=0, verbose_name="Кто смотрит")
    post = models.PositiveIntegerField(default=0, verbose_name="Какую запись смотрит")
    created = models.DateField(auto_now_add=True, auto_now=False, verbose_name="Создано")
    device = models.CharField(max_length=5, choices=DEVICE, default=DESCTOP, blank=True, verbose_name="Оборудование")

    class Meta:
        indexes = (BrinIndex(fields=['created']),)
        verbose_name = "Охват записи на стене и в лентах"
        verbose_name_plural = "Охват записей на стене и в лентах"

class PostAdNumbers(models.Model):
    DESCTOP, PHONE = 'De', 'Ph'
    DEVICE = ((DESCTOP, 'Комп'),(PHONE, 'Телефон'),)
    
    user = models.PositiveIntegerField(default=0, verbose_name="Кто смотрит")
    post = models.PositiveIntegerField(default=0, verbose_name="Какую запись смотрит")
    created = models.DateField(auto_now_add=True, auto_now=False, verbose_name="Создано")
    device = models.CharField(max_length=5, choices=DEVICE, default=DESCTOP, blank=True, verbose_name="Оборудование")

    class Meta:
        indexes = (BrinIndex(fields=['created']),)
        verbose_name = "Охват рекламной записи на стене и в лентах"
        verbose_name_plural = "Охват рекламных записей на стене и в лентах"

# Generated by Django 3.1 on 2020-08-26 15:56

from django.conf import settings
import django.contrib.postgres.indexes
from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Good',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, verbose_name='uuid')),
                ('title', models.CharField(max_length=200, verbose_name='Название')),
                ('price', models.PositiveIntegerField(blank=True, default=0, verbose_name='Цена товара')),
                ('description', models.TextField(max_length=1000, verbose_name='Описание товара')),
                ('comments_enabled', models.BooleanField(default=True, verbose_name='Разрешить комментарии')),
                ('votes_on', models.BooleanField(default=True, verbose_name='Реакции разрешены')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Создан')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='Удалено')),
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('image', imagekit.models.fields.ProcessedImageField(blank=True, upload_to='goods/%Y/%m/%d', verbose_name='Главное изображение')),
                ('image2', imagekit.models.fields.ProcessedImageField(blank=True, upload_to='goods/%Y/%m/%d', verbose_name='изображение 2')),
                ('image3', imagekit.models.fields.ProcessedImageField(blank=True, upload_to='goods/%Y/%m/%d', verbose_name='изображение 3')),
                ('image4', imagekit.models.fields.ProcessedImageField(blank=True, upload_to='goods/%Y/%m/%d', verbose_name='изображение 4')),
                ('image5', imagekit.models.fields.ProcessedImageField(blank=True, upload_to='goods/%Y/%m/%d', verbose_name='изображение 5')),
                ('status', models.CharField(choices=[('D', 'Отложен'), ('P', 'Опубликован'), ('S', 'Продан'), ('PG', 'Обработка')], default='PG', max_length=2, verbose_name='Статус')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='good_creator', to=settings.AUTH_USER_MODEL, verbose_name='Создатель')),
            ],
            options={
                'verbose_name': 'Товар',
                'verbose_name_plural': 'Товары',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='GoodCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название категории')),
                ('order', models.PositiveSmallIntegerField(default=0, verbose_name='Порядковый номер')),
                ('image', models.ImageField(blank=True, upload_to='goods/list', verbose_name='Изображение')),
            ],
            options={
                'verbose_name': 'категория товаров',
                'verbose_name_plural': 'категории товаров',
                'ordering': ['order', 'name'],
            },
        ),
        migrations.CreateModel(
            name='GoodSubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название подкатегории')),
                ('order', models.PositiveSmallIntegerField(default=0, verbose_name='Порядковый номер подкатегории')),
                ('image', models.ImageField(blank=True, upload_to='sub_category/list', verbose_name='Изображение')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goods.goodcategory', verbose_name='Категория-родитель')),
            ],
            options={
                'verbose_name': 'Подкатегория товаров',
                'verbose_name_plural': 'Подкатегории товаров',
                'ordering': ['order', 'name'],
            },
        ),
        migrations.CreateModel(
            name='GoodComment',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Создан')),
                ('modified', models.DateTimeField(auto_now_add=True)),
                ('text', models.TextField(blank=True, null=True)),
                ('is_edited', models.BooleanField(default=False, verbose_name='Изменено')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='Удаено')),
                ('commenter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Комментатор')),
                ('good_comment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='goods.good')),
                ('parent_comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='good_comment_replies', to='goods.goodcomment', verbose_name='Родительский комментарий')),
            ],
            options={
                'verbose_name': 'комментарий к записи',
                'verbose_name_plural': 'комментарии к записи',
            },
        ),
        migrations.AddField(
            model_name='good',
            name='sub_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='goods.goodsubcategory', verbose_name='Подкатегория'),
        ),
        migrations.AddIndex(
            model_name='goodcomment',
            index=django.contrib.postgres.indexes.BrinIndex(fields=['created'], name='goods_goodc_created_4f76f1_brin'),
        ),
        migrations.AddIndex(
            model_name='good',
            index=django.contrib.postgres.indexes.BrinIndex(fields=['created'], name='goods_good_created_414618_brin'),
        ),
    ]

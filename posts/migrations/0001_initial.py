# Generated by Django 2.2.5 on 2019-10-03 20:13

import ckeditor_uploader.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(db_index=True, default=uuid.uuid4, verbose_name='uuid')),
                ('content_hard', ckeditor_uploader.fields.RichTextUploadingField(blank=True, null=True)),
                ('content_lite', ckeditor_uploader.fields.RichTextUploadingField(blank=True, null=True)),
                ('content_medium', ckeditor_uploader.fields.RichTextUploadingField(blank=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Создан')),
                ('comments_enabled', models.BooleanField(default=True, verbose_name='Разрешить комментарии')),
                ('is_edited', models.BooleanField(default=False, verbose_name='Изменено')),
                ('is_closed', models.BooleanField(default=False, verbose_name='Закрыто')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='Удалено')),
                ('views', models.IntegerField(default=0, verbose_name='Просмотры')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts_creator', to=settings.AUTH_USER_MODEL, verbose_name='Создатель')),
            ],
            options={
                'verbose_name_plural': 'посты',
                'verbose_name': 'пост',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='PostComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(db_index=True, default=django.utils.timezone.now, editable=False, verbose_name='Создан')),
                ('text', models.TextField(blank=True, null=True)),
                ('is_edited', models.BooleanField(default=False, verbose_name='Изменено')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='Удаено')),
                ('object_id', models.PositiveIntegerField()),
                ('commenter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts_comments', to=settings.AUTH_USER_MODEL, verbose_name='Комментатор')),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('parent_comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='posts.PostComment', verbose_name='Родительский комментарий')),
            ],
        ),
        migrations.CreateModel(
            name='Repost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('object_id', models.PositiveIntegerField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
            ],
        ),
        migrations.CreateModel(
            name='PostUserMention',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_mentions', to='posts.Post', verbose_name='Пост')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_mentions', to=settings.AUTH_USER_MODEL, verbose_name='Упоминаемый')),
            ],
        ),
        migrations.CreateModel(
            name='PostMute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('muter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_mutes', to=settings.AUTH_USER_MODEL, verbose_name='Кто заглушил')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mutes', to='posts.Post', verbose_name='Пост')),
            ],
        ),
        migrations.CreateModel(
            name='PostCommentUserMention',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_mentions', to='posts.PostComment', verbose_name='Пост')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_comment_mentions', to=settings.AUTH_USER_MODEL, verbose_name='Упомянутый в комментарии')),
            ],
        ),
        migrations.CreateModel(
            name='PostCommentMute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('muter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_comment_mutes', to=settings.AUTH_USER_MODEL, verbose_name='Кто заглушил')),
                ('post_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mutes', to='posts.PostComment', verbose_name='Пост')),
            ],
        ),
    ]

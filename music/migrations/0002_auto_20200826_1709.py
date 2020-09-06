# Generated by Django 3.1 on 2020-08-26 17:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0002_auto_20200826_1709'),
        ('chat', '0001_initial'),
        ('gallery', '0002_auto_20200826_1709'),
        ('communities', '0001_initial'),
        ('posts', '0001_initial'),
        ('video', '0001_initial'),
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='soundcloudparsing',
            name='good_comment',
            field=models.ManyToManyField(blank=True, related_name='good_comment_music', to='goods.GoodComment'),
        ),
        migrations.AddField(
            model_name='soundcloudparsing',
            name='item',
            field=models.ManyToManyField(blank=True, related_name='item_music', to='posts.Post'),
        ),
        migrations.AddField(
            model_name='soundcloudparsing',
            name='item_comment',
            field=models.ManyToManyField(blank=True, related_name='comment_music', to='posts.PostComment'),
        ),
        migrations.AddField(
            model_name='soundcloudparsing',
            name='message',
            field=models.ManyToManyField(blank=True, related_name='message_music', to='chat.Message'),
        ),
        migrations.AddField(
            model_name='soundcloudparsing',
            name='photo_comment',
            field=models.ManyToManyField(blank=True, related_name='gallery_comment_music', to='gallery.PhotoComment'),
        ),
        migrations.AddField(
            model_name='soundcloudparsing',
            name='video_comment',
            field=models.ManyToManyField(blank=True, related_name='video_comment_music', to='video.VideoComment'),
        ),
        migrations.AddField(
            model_name='soundlist',
            name='community',
            field=models.ForeignKey(blank=True, db_index=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='community_playlist', to='communities.community', verbose_name='Сообщество'),
        ),
        migrations.AddField(
            model_name='soundlist',
            name='post',
            field=models.ManyToManyField(blank=True, related_name='post_soundlist', to='posts.Post'),
        ),
    ]

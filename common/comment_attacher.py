from rest_framework.exceptions import ValidationError
from video.models import Video
from music.models import SoundcloudParsing
from gallery.models import Photo
from goods.models import Good
from main.models import Item


def get_comment_attach(comment, select_photo1, select_photo2, select_video1, select_video2,
                        select_music1, select_music2, select_good1, select_good2, select_article1, select_article2):
    if select_photo1:
        try:
            _select_photo = Photo.objects.get(uuid=select_photo1, is_public=True)
            _select_photo.item_comment.add(comment)
        except:
            raise ValidationError('Фото не найдено')
    if select_photo2:
        try:
            _select_photo2 = Photo.objects.get(uuid=select_photo2, is_public=True)
            _select_photo2.item_comment.add(comment)
        except:
            raise ValidationError('Фото не найдено')
    if select_video1:
        try:
            _select_video = Video.objects.get(pk=select_video1, is_public=True)
            _select_video.item_comment.add(comment)
        except:
            raise ValidationError('Видео не найдено')
    if select_video2:
        try:
            _select_video2 = Video.objects.get(pk=select_video2, is_public=True)
            _select_video2.item_comment.add(comment)
        except:
            raise ValidationError('Видео не найдено')
    if select_music1:
        try:
            _select_music = SoundcloudParsing.objects.get(pk=select_music1)
            _select_music.item_comment.add(comment)
        except:
            raise ValidationError('Аудиозапись не найдена')
    if select_music2:
        try:
            _select_music2 = SoundcloudParsing.objects.get(pk=select_music2)
            _select_music2.item_comment.add(comment)
        except:
            raise ValidationError('Аудиозапись не найдена')
    if select_good1:
        try:
            _select_good = Good.objects.get(pk=select_good1)
            _select_good.item_comment.add(comment)
        except:
            raise ValidationError('Товар не найден')
    if select_good2:
        try:
            _select_good2 = Good.objects.get(pk=select_good2)
            _select_good2.item_comment.add(comment)
        except:
            raise ValidationError('Товар не найден')
    if select_article1:
        try:
            _select_article = Item.objects.get(uuid=select_article1)
            _select_article.comment_attach.add(comment)
        except:
            raise ValidationError('Статья не найдена')
    if select_article2:
        try:
            _select_article2 = Item.objects.get(uuid=select_article2)
            _select_article2.comment_attach.add(comment)
        except:
            raise ValidationError('Статья не найдена')

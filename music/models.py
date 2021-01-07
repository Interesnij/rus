import uuid
from django.conf import settings
from django.db import models
from django.contrib.postgres.indexes import BrinIndex
from django.utils import timezone
from communities.models import Community
from pilkit.processors import ResizeToFill, ResizeToFit
from imagekit.models import ProcessedImageField
from gallery.helpers import upload_to_photo_directory


class SoundGenres(models.Model):
    name = models.CharField(max_length=100, unique=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def get_tracks_count(self):
        return self.track_genre.count()

    def is_track_in_genre(self, track_id):
        self.track_genre.filter(id=track_id).exists()

    def playlist_too(self):
        queryset = self.track_genre.all()
        return queryset[:300]

    class Meta:
        verbose_name = "жанр"
        verbose_name_plural = "жанры"


class SoundSymbol(models.Model):
    RUS_SYMBOL = 'RS'
    ANGL_SYMBOL = 'AS'
    NUMBER_SYMBOL = 'NS'
    SYMBOL_TYPES = (
        (RUS_SYMBOL, 'русские исполнители'),
        (ANGL_SYMBOL, 'английские исполнители'),
        (NUMBER_SYMBOL, 'исполнители по цифрам'),
        )

    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    type = models.CharField(max_length=5, choices=SYMBOL_TYPES, default=ANGL_SYMBOL, verbose_name="Язык исполнителя")

    def __str__(self):
        return self.name

    def get_tags_count(self):
        return self.symbol_papa.count()

    class Meta:
        verbose_name = "буква поиска музыки"
        verbose_name_plural = "буквы поиска музыки"


class SoundList(models.Model):
    MAIN = 'MA'
    LIST = 'LI'
    TYPE = (
        (MAIN, 'Основной плейлист'),
        (LIST, 'Пользовательский плейлист'),
    )
    name = models.CharField(max_length=255)
    community = models.ForeignKey('communities.Community', related_name='community_playlist', db_index=False, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Сообщество")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_playlist', db_index=False, on_delete=models.CASCADE, verbose_name="Создатель")
    type = models.CharField(max_length=5, choices=TYPE, default=LIST, verbose_name="Тип листа")
    order = models.PositiveIntegerField(default=0)
    uuid = models.UUIDField(default=uuid.uuid4, verbose_name="uuid")
    is_deleted = models.BooleanField(verbose_name="Удален", default=False )
    image = models.CharField(max_length=255, blank=True, null=True)

    users = models.ManyToManyField("users.User", blank=True, related_name='user_soundlist')
    communities = models.ManyToManyField('communities.Community', blank=True, related_name='community_soundlist')

    def __str__(self):
        return self.name + " " + self.creator.get_full_name()

    def is_track_in_list(self, track_id):
        return self.players.filter(pk=track_id).values("pk").exists()

    def is_not_empty(self):
        return self.players.filter(list=self).values("pk").exists()

    def playlist_too(self):
        queryset = self.players.filter(is_deleted=False)
        return queryset

    def get_users_ids(self):
        users = self.user_soundlist.exclude(perm="DE").exclude(perm="BL").exclude(perm="PV")
        return [i['pk'] for i in users]

    def get_communities_ids(self):
        communities = self.community_soundlist.exclude(perm="DE").exclude(perm="BL")
        return [i['pk'] for i in communities]

    def playlist_30(self):
        queryset = self.players.only("pk")[:30]
        return queryset
    def playlist_6(self):
        queryset = self.players.only("pk")[:6]
        return queryset

    def count_tracks(self):
        return self.players.filter(is_deleted=False).values("pk").count()

    def is_main_list(self):
        return self.type == self.MAIN
    def is_user_list(self):
        return self.type == self.LIST

    class Meta:
        verbose_name = "список: весь, человека или сообщества"
        verbose_name_plural = "списки: весь, человека или сообщества"
        ordering = ['order']


class SoundTags(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    order = models.IntegerField(default=0)
    symbol = models.ForeignKey(SoundSymbol, related_name="symbol_papa", on_delete=models.CASCADE, verbose_name="Буква")

    def __str__(self):
        return self.name

    def is_track_in_tag(self, track_id):
        self.track_tag.filter(id=track_id).exists()

    def get_genres(self):
        from django.db.models import Q

        genres_list = []
        genres = self.track_tag.values('genre_id')
        genres_ids = [id['genre_id'] for id in genres]
        for genre in genres_ids:
            if not genre in genres_list:
                genres_list = genres_list + [genre,]

        genres_query = Q(id__in=genres_list)
        result = SoundGenres.objects.filter(genres_query)
        return result

    def playlist_too(self):
        queryset = self.track_tag.all()
        return queryset

    def get_tracks_count(self):
        return self.track_tag.count()

    class Meta:
        verbose_name = "тег"
        verbose_name_plural = "теги"

class UserTempSoundList(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_of_field', db_index=False, on_delete=models.CASCADE, verbose_name="Слушатель")
    list = models.ForeignKey(SoundList, related_name='list_field', null=True, blank=True, on_delete=models.CASCADE, verbose_name="Связь на плейлист человека или сообщества")
    tag = models.ForeignKey(SoundTags, related_name='tag_field', null=True, blank=True, on_delete=models.CASCADE, verbose_name="Связь на тег")
    genre = models.ForeignKey(SoundGenres, related_name='genre_field', null=True, blank=True, on_delete=models.CASCADE, verbose_name="Связь на жанр")


class SoundcloudParsing(models.Model):
    id = models.BigAutoField(primary_key=True)
    artwork_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    duration = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    genre = models.ForeignKey(SoundGenres, related_name='track_genre', on_delete=models.CASCADE, verbose_name="Жанр трека")
    tag = models.ForeignKey(SoundTags, blank=True, null=True, related_name='track_tag', on_delete=models.CASCADE, verbose_name="Буква")
    title = models.CharField(max_length=255, blank=True, null=True)
    uri = models.CharField(max_length=255, blank=True, null=True)
    release_year = models.CharField(max_length=10, blank=True, null=True)
    is_deleted = models.BooleanField(verbose_name="Удален",default=False)
    list = models.ManyToManyField(SoundList, related_name='players', blank="True")

    post = models.ManyToManyField("posts.Post", blank=True, related_name='item_music')
    item_comment = models.ManyToManyField("posts.PostComment", blank=True, related_name='comment_music')
    photo_comment = models.ManyToManyField('gallery.PhotoComment', blank=True, related_name='gallery_comment_music')
    good_comment = models.ManyToManyField('goods.GoodComment', blank=True, related_name='good_comment_music')
    video_comment = models.ManyToManyField('video.VideoComment', blank=True, related_name='video_comment_music')
    message = models.ManyToManyField('chat.Message', blank=True, related_name='message_music')

    def __str__(self):
        return self.title

    def get_mp3(self):
        url = self.uri + '/stream?client_id=3ddce5652caa1b66331903493735ddd64d'
        url.replace("\\?", "%3f")
        url.replace("=", "%3d")
        return url

    class Meta:
        verbose_name = "спарсенные треки"
        verbose_name_plural = "спарсенные треки"
        indexes = (BrinIndex(fields=['created_at']),)
        ordering = ['-created_at']

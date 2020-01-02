from django.db import models


class SoundParsing(models.Model):
    artwork_url = models.URLField(max_length=255, blank=True)
    bpm = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(max_length=255, blank=True, null=True)
    duration = models.CharField(max_length=255, blank=True)
    genre = models.CharField(max_length=255, blank=True)
    permalink = models.CharField(max_length=255, blank=True)
    permalink_url = models.URLField(max_length=255, blank=True)
    release = models.CharField(max_length=255, blank=True)
    release_day = models.CharField(max_length=255, blank=True)
    release_month = models.CharField(max_length=255, blank=True)
    release_year = models.CharField(max_length=255, blank=True)
    stream_url = models.URLField(max_length=255, blank=True)
    streamable = models.BooleanField(default=True)
    tag_list = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    uri = models.CharField(max_length=255, blank=True)
    isrc = models.CharField(max_length=255, blank=True)
    user_name = models.CharField(max_length=255, blank=True)
    user_avatar = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-created_at',)

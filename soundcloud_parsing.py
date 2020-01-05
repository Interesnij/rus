# -*- coding: utf-8 -*-
from locale import *
import sys,os

project_dir = '../tr/tr/'

sys.path.append(project_dir)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django
django.setup()

import soundcloud
from music.models import *
from datetime import datetime, date, time


client = soundcloud.Client(client_id='dce5652caa1b66331903493735ddd64d')
page_size = 200
genres_list = SounGenres.objects.values('name')
genres_list_names = [name['name'] for name in genres_list]
a_rus_list = ['Агата Кристи', 'Аквариум']

count = 0
all_track_playlist = SoundList.objects.get(id=2)

for tag in a_rus_list:
    tracks = client.get('/tracks', q=tag, limit=page_size, linked_partitioning=1)
    if tracks:
        for track in tracks.collection:
            try:
                SoundParsing.objects.get(id=track.id)
            except:
                if track.genre and track.release_year and track.duration > 90000 and track.genre in genres_list_names:
                    genre =SounGenres.objects.get(name=track.genre.replace("'", '') )
                    new_track = SoundParsing.objects.create(id=track.id, artwork_url=track.artwork_url, created_at=created_at, duration=track.duration, genre=genre, stream_url=track.stream_url, title=track.title, uri=track.uri, release_year=track.release_year, tag=track.tag)
                    all_track_playlist.track.add(new_track)
                count = count + 1


for track in all_tracks.collection:
    created_at = track.created_at
    created_at = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
    try:
        SoundParsing.objects.get(id=track.id)
    except:
        if track.genre and track.release_year and track.genre in genres_list_names:
            genre =SounGenres.objects.get(name=track.genre.replace("'", '') )
            new_track = SoundParsing.objects.create(id=track.id, artwork_url=track.artwork_url, created_at=created_at, duration=track.duration, genre=genre, stream_url=track.stream_url, title=track.title, uri=track.uri, release_year=track.release_year, tag=track.tag)
            all_track_playlist.track.add(new_track)
        count = count + 1

while all_tracks.next_href != None and count < 2000:
    all_tracks = client.get(all_tracks.next_href, limit=page_size, linked_partitioning=1)
    for track in all_tracks.collection:
        created_at = track.created_at
        created_at = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
        try:
            SoundParsing.objects.get(id=track.id)
        except:
            if track.genre and track.release_year and track.genre in genres_list_names:
                genre = SounGenres.objects.get(name=track.genre.replace("'", '') )
                new_track = SoundParsing.objects.create(id=track.id, artwork_url=track.artwork_url, created_at=created_at, duration=track.duration, genre=genre, stream_url=track.stream_url, title=track.title, uri=track.uri, release_year=track.release_year, tag=track.tag)
                all_track_playlist.track.add(new_track)
        count = count + 1

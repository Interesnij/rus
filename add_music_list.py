# -*- coding: utf-8 -*-
from locale import *
import csv,sys,os

project_dir = '../tr/tr/'

sys.path.append(project_dir)

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
import django, json, requests

django.setup()

import soundcloud
from music.models import *
from PIL import Image


client = soundcloud.Client(client_id='dce5652caa1b66331903493735ddd64d')


response = requests.get("https://api.soundcloud.com/resolve?url=https://soundcloud.com/yeonkkot/sets/s12&client_id=dce5652caa1b66331903493735ddd64d")
data = response.json()

if data:
    playlist_url = data['artwork_url']
    print(playlist_url)
    #playlist_url.replace("large.jpg", "crop.jpg")
    img_response = requests.get(url=playlist_url).raw
    print(img_response)
    img = Image.open(img_response)
    print(img)

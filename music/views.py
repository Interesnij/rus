import soundcloud
from django.views.generic.base import TemplateView
from django.views import View
from django.shortcuts import render_to_response
from django.http import JsonResponse
from rest_framework.response import Response
import requests


class AllMusicView(TemplateView):
    template_name="all_music.html"


class AllMusicListView(View):

    def get(self,request,*args,**kwargs):
        page_size = 200
        client = soundcloud.Client(client_id='dce5652caa1b66331903493735ddd64d')
        all_tracks = client.get('/tracks', order='created_at', limit=page_size, linked_partitioning=1)
        for track in all_tracks.collection:
            print(track)
        while all_tracks.next_href != None:
            all_tracks = client.get(all_tracks.next_href, order='created_at', limit=page_size, linked_partitioning=1)
            for track in all_tracks.collection:
                print(track)
        response = render('all_music_list.html',{'all_tracks':all_tracks})
        return response


class AllSearchMusicView(View):
    template_name="search_music.html"
    def get(self,request,*args,**kwargs):
        client = soundcloud.Client(client_id='dce5652caa1b66331903493735ddd64d')
        if request.method == 'GET':
            q = request.GET.get('music_search')
            s_tracks = client.get('/tracks', q=q, license='cc-by-sa')
            response = render(request,'all_music.html',{'tracks_list':s_tracks,'q':q})
            return response
        return super(AllSearchMusicView,self).get(request,*args,**kwargs)

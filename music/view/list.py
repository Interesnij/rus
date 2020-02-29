from django.views import View
from django.shortcuts import render_to_response
from music.models import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from common.utils import is_mobile


class TagsList(View):
    """
    Список тегов отдельной буквы поиска музыки
    """
    def get(self, request, *args, **kwargs):
        context = {}
        symbol = SoundSymbol.objects.get(pk=self.kwargs["pk"])
        tags_list = SoundTags.objects.filter(symbol=symbol)
        current_page = Paginator(tags_list, 30)
        page = request.GET.get('page')
        context['symbol'] = symbol
        context['request_user'] = request.user
        try:
            context['tags_list'] = current_page.page(page)
        except PageNotAnInteger:
            context['tags_list'] = current_page.page(1)
        except EmptyPage:
            context['tags_list'] = current_page.page(current_page.num_pages)
        return render_to_response('music/tags_list.html', context)


class TagList(View):
    """
    Список треков отдельного тега
    """
    def get(self,request,*args,**kwargs):
        context = {}
        tag=SoundTags.objects.get(pk=self.kwargs["pk"])
        tag_list = SoundcloudParsing.objects.filter(tag__id=tag.pk)
        current_page = Paginator(tag_list, 30)
        page = request.GET.get('page')
        context['tag'] = tag
        context['request_user'] = request.user

        try:
            context['tag_list'] = current_page.page(page)
        except PageNotAnInteger:
            context['tag_list'] = current_page.page(1)
        except EmptyPage:
            context['tag_list'] = current_page.page(current_page.num_pages)
        return render_to_response('music/tag_music_list.html', context)


class GenreList(View):
    """
    Список треков отдельного жанра
    """
    def get(self,request,*args,**kwargs):
        context = {}
        genre = SoundGenres.objects.get(pk=self.kwargs["pk"])
        genre_list = SoundcloudParsing.objects.filter(genre__id=genre.pk)
        current_page = Paginator(genre_list, 30)
        page = request.GET.get('page')
        context['genre'] = genre
        context['request_user'] = request.user

        try:
            context['genre_list'] = current_page.page(page)
        except PageNotAnInteger:
            context['genre_list'] = current_page.page(1)
        except EmptyPage:
            context['genre_list'] = current_page.page(current_page.num_pages)
        return render_to_response('music/genre_music_list.html', context)

from music.models import *
from communities.models import Community
from django.views import View
from django.views.generic.base import TemplateView
from rest_framework.exceptions import PermissionDenied
from music.forms import PlaylistForm
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from common.parsing_soundcloud.add_playlist import add_playlist
from django.http import Http404


class CommunitySoundcloudSetPlaylistWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        self.template_name = self.community.get_manage_template(folder="music_create/", template="c_soundcloud_add_playlist.html", request=request)
        return super(CommunitySoundcloudSetPlaylistWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunitySoundcloudSetPlaylistWindow,self).get_context_data(**kwargs)
        context['form_post'] = PlaylistForm()
        return context

class CommunitySoundcloudSetWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        self.template_name = self.community.get_manage_template(folder="music_create/", template="c_soundcloud_set_playlist.html", request=request)
        return super(CommunitySoundcloudSetWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunitySoundcloudSetWindow,self).get_context_data(**kwargs)
        return context


class CommunitySoundcloudSetCreate(View):
    form_post = None

    def get_context_data(self,**kwargs):
        context = super(CommunitySoundcloudSetCreate,self).get_context_data(**kwargs)
        context["form_post"] = PlaylistForm()
        return context

    def post(self,request,*args,**kwargs):
        form_post = PlaylistForm(request.POST)
        community = Community.objects.get(pk=self.kwargs["pk"])

        if request.is_ajax() and form_post.is_valid() and request.user.is_staff_of_community_with_name(community.name):
            new_list = form_post.save(commit=False)
            new_list.creator = request.user
            new_list.community = community
            new_list.save()
            add_playlist(request.POST.get('permalink'), request.user, new_list)
            return render(request, 'c_music_list/admin_list.html',{'playlist': new_list, 'object_list': new_list.playlist_too(),'community': community})
        else:
            return HttpResponseBadRequest()

class CommunitySoundcloudSet(View):
    def post(self,request,*args,**kwargs):
        community = Community.objects.get(pk=self.kwargs["pk"])
        list = SoundList.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(community.name):
            add_playlist(request.POST.get('permalink'), request.user, list)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()


class CommunityTrackAdd(View):
    """
    Добавляем трек в плейлист сообщества, если его там нет
    """
    def get(self, request, *args, **kwargs):
        track = SoundcloudParsing.objects.get(pk=self.kwargs["pk"])
        list = SoundList.objects.get(uuid=self.kwargs["uuid"])

        if request.is_ajax() and not list.is_track_in_list(track.pk) and request.user.is_staff_of_community_with_name(list.community.name):
            list.players.add(track)
            return HttpResponse()
        else:
            raise Http404

class CommunityTrackRemove(View):
    """
    Удаляем трек из плейлиста сообщества, если он там есть
    """
    def get(self, request, *args, **kwargs):
        track = SoundcloudParsing.objects.get(pk=self.kwargs["pk"])
        list = SoundList.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and list.is_track_in_list(track.pk) and request.user.is_staff_of_community_with_name(list.community.name):
            list.players.remove(track)
            return HttpResponse()
        else:
            raise Http404

class CommunityTrackListAdd(View):
    """
    Добавляем трек в любой плейлист сообщества, если его там нет
    """
    def get(self, request, *args, **kwargs):
        track = SoundcloudParsing.objects.get(pk=self.kwargs["pk"])
        list = SoundList.objects.get(uuid=self.kwargs["uuid"])

        if request.is_ajax() and not list.is_track_in_list(track.pk) and request.user.is_staff_of_community_with_name(list.community.name):
            list.players.add(track)
            return HttpResponse()
        else:
            raise Http404

class CommunityTrackListRemove(View):
    """
    Удаляем трек из любого плейлиста сообщества, если он там есть
    """
    def get(self, request, *args, **kwargs):
        track = SoundcloudParsing.objects.get(pk=self.kwargs["pk"])
        list = SoundList.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and list.is_track_in_list(track.pk) and request.user.is_staff_of_community_with_name(list.community.name):
            list.players.remove(track)
            return HttpResponse()
        else:
            raise Http404

class CommunityCreatePlaylistWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        self.template_name = self.community.get_manage_template(folder="music_create/", template="c_create_list.html", request=request)
        return super(CommunityCreatePlaylistWindow,self).get(request,*args,**kwargs)

class CommunityEditPlaylistWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        self.playlist = SoundList.objects.get(uuid=self.kwargs["uuid"])
        self.template_name = get_settings_template("music_create/u_edit_list.html", request)
        return super(CommunityEditPlaylistWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunityEditPlaylistWindow,self).get_context_data(**kwargs)
        context["playlist"] = self.playlist
        context["community"] = self.community
        return context


class CommunityPlaylistCreate(View):
    form_post = None

    def get_context_data(self,**kwargs):
        context = super(CommunityPlaylistCreate,self).get_context_data(**kwargs)
        context["form_post"] = PlaylistForm()
        return context

    def post(self,request,*args,**kwargs):
        form_post = PlaylistForm(request.POST)
        community = Community.objects.get(pk=self.kwargs["pk"])

        if request.is_ajax() and form_post.is_valid() and request.user.is_staff_of_community_with_name(community.name):
            new_list = form_post.save(commit=False)
            new_list.creator = request.user
            new_list.community = community
            if not new_list.order:
                new_list.order = 0
            new_list.save()
            return render(request, 'c_music_list/admin_list.html',{'playlist': new_list, 'community': community})
        else:
            return HttpResponseBadRequest()


class CommunityPlaylistEdit(TemplateView):
    """
    изменение плейлиста пользователя
    """
    template_name = None
    form=None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        self.template_name = get_settings_template("music_create/c_edit_list.html", request)
        return super(CommunityPlaylistEdit,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunityPlaylistEdit,self).get_context_data(**kwargs)
        context["user"] = self.user
        context["list"] = SoundList.objects.get(uuid=self.kwargs["uuid"])
        return context

    def post(self,request,*args,**kwargs):
        self.list = SoundList.objects.get(uuid=self.kwargs["uuid"])
        self.form = PlaylistForm(request.POST,instance=self.list)
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and self.form.is_valid() and self.user == request.user:
            list = self.form.save(commit=False)
            self.form.save()
            return HttpResponse()
        else:
            return HttpResponseBadRequest()
        return super(CommunityPlaylistEdit,self).get(request,*args,**kwargs)

class CommunityPlaylistDelete(View):
    def get(self,request,*args,**kwargs):
        community = Community.objects.get(pk=self.kwargs["pk"])
        list = SoundList.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and user == request.user and list.type == SoundList.LIST:
            list.is_deleted = True
            list.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class CommunityPlaylistAbortDelete(View):
    def get(self,request,*args,**kwargs):
        community = Community.objects.get(pk=self.kwargs["pk"])
        list = SoundList.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and user == request.user:
            list.is_deleted = False
            list.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

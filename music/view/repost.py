from django.views.generic.base import TemplateView
from communities.models import Community
from django.http import HttpResponse, HttpResponseBadRequest
from posts.forms import PostForm
from posts.models import Post
from music.models import SoundList, SoundcloudParsing
from users.models import User
from common.check.user import check_user_can_get_list
from common.check.community import check_can_get_lists
from common.processing.post import get_post_processing, repost_message_send, repost_community_send
from common.template.user import get_detect_platform_template
from django.views import View


class UUCMMusicWindow(TemplateView):
    """
    форма репоста аудиозаписи пользователя к себе на стену, в свои сообщества, в несколько сообщений
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.track, self.user = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), User.objects.get(pk=self.kwargs["pk"])
        if self.user != request.user:
            check_user_can_get_list(request.user, self.user)
        self.template_name = get_detect_platform_template("music/music_repost_window/u_ucm_music.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(UUCMMusicWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(UUCMMusicWindow,self).get_context_data(**kwargs)
        context["form"] = PostForm()
        context["object"] = self.track
        context["user"] = self.user
        return context

class CUCMMusicWindow(TemplateView):
    """
    форма репоста аудиозаписи сообщества к себе на стену, в свои сообщества, в несколько сообщений
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.track, self.community = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_lists(request.user, self.community)
        self.template_name = get_detect_platform_template("music/music_repost_window/c_ucm_music.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(CUCMMusicWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CUCMMusicWindow,self).get_context_data(**kwargs)
        context["form"] = PostForm()
        context["object"] = self.track
        context["community"] = self.community
        return context

class UUCMMusicListWindow(TemplateView):
    """
    форма репоста плейлиста пользователя к себе на стену, в свои сообщества, в несколько сообщений
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.playlist, self.user = SoundList.objects.get(uuid=self.kwargs["uuid"]), User.objects.get(pk=self.kwargs["pk"])
        if self.user != request.user:
            check_user_can_get_list(request.user, self.user)
        self.template_name = get_detect_platform_template("music/music_repost_window/u_ucm_list_music.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(UUCMMusicListWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(UUCMMusicListWindow,self).get_context_data(**kwargs)
        context["form"] = PostForm()
        context["object"] = self.playlist
        context["user"] = self.user
        return context

class CUCMMusicListWindow(TemplateView):
    """
    форма репоста плейлиста сообщества к себе на стену, в свои сообщества, в несколько сообщений
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.playlist, self.community = SoundList.objects.get(uuid=self.kwargs["uuid"]), Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_lists(request.user, self.community)
        self.template_name = get_detect_platform_template("music/music_repost_window/c_ucm_list_music.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(CUCMMusicListWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CUCMMusicListWindow,self).get_context_data(**kwargs)
        context["form"] = PostForm()
        context["object"] = self.playlist
        context["community"] = self.community
        return context


class UUMusicRepost(View):
    """
    создание репоста записи пользователя на свою стену
    """
    def post(self, request, *args, **kwargs):
        track, user, attach = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), User.objects.get(pk=self.kwargs["pk"]), request.POST.getlist('attach_items')
        if user != request.user:
            check_user_can_get_list(request.user, user)
        form_post = PostForm(request.POST)
        if request.is_ajax() and form_post.is_valid():
            post = form_post.save(commit=False)
            parent = Post.create_parent_post(creator=user, community=None, status=Post.MUSIC_REPOST)
            track.item.add(parent)
            new_post = post.create_post(creator=request.user, attach=attach, is_signature=False, text=post.text, community=None, comments_enabled=post.comments_enabled, parent=parent, status=Post.STATUS_PROCESSING)
            get_post_processing(new_post)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CUMusicRepost(View):
    """
    создание репоста записи сообщества на свою стену
    """
    def post(self, request, *args, **kwargs):
        track, community, form_post, attach = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), Community.objects.get(pk=self.kwargs["pk"]), PostForm(request.POST), request.POST.getlist('attach_items')
        check_can_get_lists(request.user, community)
        if request.is_ajax() and form_post.is_valid():
            post = form_post.save(commit=False)
            parent = Post.create_parent_post(creator=request.user, community=community, status=Post.MUSIC_REPOST)
            track.item.add(parent)
            new_post = post.create_post(creator=request.user, attach=attach, is_signature=False, text=post.text, community=None, comments_enabled=post.comments_enabled, parent=parent, status="PG")
            get_post_processing(new_post)
            return HttpResponse("")
        else:
            return HttpResponseBadRequest()


class UCMusicRepost(View):
    """
    создание репоста записи пользователя на стены списка сообществ, в которых пользователь - управленец
    """
    def post(self, request, *args, **kwargs):
        track, user = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_user_can_get_list(request.user, user)
        repost_community_send(track, Post.MUSIC_REPOST, None, request)
        return HttpResponse()

class CCMusicRepost(View):
    """
    создание репоста записи сообщества на стены списка сообществ, в которых пользователь - управленец
    """
    def post(self, request, *args, **kwargs):
        track, community = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_lists(request.user, community)
        repost_community_send(track, Post.MUSIC_REPOST, community, request)
        return HttpResponse()


class UMMusicRepost(View):
    """
    создание репоста записи пользователя в беседы, в которых состоит пользователь
    """
    def post(self, request, *args, **kwargs):
        track, user = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_user_can_get_list(request.user, user)
        repost_message_send(track, Post.MUSIC_REPOST, None, request, "Репост плейлиста пользователя")
        return HttpResponse()

class CMMusicRepost(View):
    """
    создание репоста записи сообщества в беседы, в которых состоит пользователь
    """
    def post(self, request, *args, **kwargs):
        track, community = SoundcloudParsing.objects.get(pk=self.kwargs["track_pk"]), Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_lists(request.user, community)
        repost_message_send(track, Post.MUSIC_REPOST, community, request, "Репост плейлиста сообщества")
        return HttpResponse()


class UUMusicListRepost(View):
    """
    создание репоста плейлиста пользователя на свою стену
    """
    def post(self, request, *args, **kwargs):
        playlist, user, attach = SoundList.objects.get(uuid=self.kwargs["uuid"]), User.objects.get(pk=self.kwargs["pk"]), request.POST.getlist('attach_items')
        if user != request.user:
            check_user_can_get_list(request.user, user)
        form_post = PostForm(request.POST)
        if request.is_ajax() and form_post.is_valid():
            post = form_post.save(commit=False)
            parent = Post.create_parent_post(creator=playlist.creator, community=None, status=Post.MUSIC_LIST_REPOST)
            playlist.post.add(parent)
            new_post = post.create_post(creator=request.user, attach=attach, is_signature=False, text=post.text, community=None, comments_enabled=post.comments_enabled, parent=parent, status="PG")
            get_post_processing(new_post)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CUMusicListRepost(View):
    """
    создание репоста плейлиста сообщества на свою стену
    """
    def post(self, request, *args, **kwargs):
        playlist, community, form_post, attach = SoundList.objects.get(uuid=self.kwargs["uuid"]), Community.objects.get(pk=self.kwargs["pk"]), PostForm(request.POST), request.POST.getlist('attach_items')
        check_can_get_lists(request.user, community)
        if request.is_ajax() and form_post.is_valid():
            post = form_post.save(commit=False)
            parent = Post.create_parent_post(creator=playlist.creator, community=community, status=Post.MUSIC_LIST_REPOST)
            playlist.post.add(parent)
            new_post = post.create_post(creator=request.user, attach=attach, is_signature=False, text=post.text, community=None, comments_enabled=post.comments_enabled, parent=parent, status="PG")
            get_post_processing(new_post)
            return HttpResponse("")
        else:
            return HttpResponseBadRequest()


class UCMusicListRepost(View):
    """
    создание репоста плейлиста пользователя на стены списка сообществ, в которых пользователь - управленец
    """
    def post(self, request, *args, **kwargs):
        playlist, user = SoundList.objects.get(uuid=self.kwargs["uuid"]), User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_user_can_get_list(request.user, user)
        repost_community_send(playlist, Post.MUSIC_LIST_REPOST, None, request)
        return HttpResponse()


class CCMusicListRepost(View):
    """
    создание репоста плейлиста сообщества на стены списка сообществ, в которых пользователь - управленец
    """
    def post(self, request, *args, **kwargs):
        playlist, community = SoundList.objects.get(uuid=self.kwargs["uuid"]), Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_lists(request.user, community)
        repost_community_send(playlist, Post.MUSIC_LIST_REPOST, community, request)
        return HttpResponse()


class UMMusicListRepost(View):
    """
    создание репоста плейлиста пользователя в беседы, в которых состоит пользователь
    """
    def post(self, request, *args, **kwargs):
        playlist, user = SoundList.objects.get(uuid=self.kwargs["uuid"]), User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_user_can_get_list(request.user, user)
        repost_message_send(playlist, Post.MUSIC_LIST_REPOST, None, request, "Репост плейлиста пользователя")
        return HttpResponse()


class CMMusicListRepost(View):
    """
    создание репоста плейлиста сообщества в беседы, в которых состоит пользователь
    """
    def post(self, request, *args, **kwargs):
        playlist, community = SoundList.objects.get(uuid=self.kwargs["uuid"]), Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_lists(request.user, community)
        repost_message_send(playlist, Post.MUSIC_LIST_REPOST, community, request, "Репост плейлиста сообщества")
        return HttpResponse()

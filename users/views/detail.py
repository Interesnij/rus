import re
MOBILE_AGENT_RE = re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
from django.views.generic.base import TemplateView
from users.models import User
from django.views.generic import ListView
from music.models import SoundcloudParsing
from communities.models import Community
from common.checkers import check_is_not_blocked_with_user_with_id, check_is_connected_with_user_with_id
from rest_framework.exceptions import PermissionDenied
from common.template.post import get_template_user_post
from common.template.music import get_template_user_music
from common.template.video import get_template_user_video
from common.template.user import get_template_user


class UserPostView(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        from posts.models import Post
        self.user = User.objects.get(pk=self.kwargs["pk"])
        self.post = Post.objects.get(uuid=self.kwargs["uuid"])
        self.posts = self.user.get_posts()

        self.template_name = get_template_user_post(self.user, "lenta/", "post.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + self.template_name
        self.next = self.posts.filter(pk__gt=self.post.pk).order_by('pk').first()
        self.prev = self.posts.filter(pk__lt=self.post.pk).order_by('-pk').first()
        return super(UserPostView,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(UserPostView,self).get_context_data(**kwargs)
        context["object"] = self.post
        context["user"] = self.user
        context["next"] = self.next
        context["prev"] = self.prev
        return context

class UserCommunities(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.user = User.objects.get(pk=self.kwargs["pk"])
        self.template_name = get_template_user(self.user, "user_community/", "communities.html", request.user)
        if self.user.is_staffed_user() and self.user == request.user:
            self.template_name = "user_community/my_staffed_communities.html"

        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + self.template_name
        return super(UserCommunities,self).get(request,*args,**kwargs)

    def get_context_data(self, **kwargs):
        context = super(UserCommunities, self).get_context_data(**kwargs)
        context['user'] = self.user
        return context

    def get_queryset(self):
        communities_list = self.user.get_communities()
        return communities_list

class UserStaffCommunities(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.user = User.objects.get(pk=self.kwargs["pk"])
        if self.user.is_staffed_user() and self.user == request.user:
            self.template_name = "user_community/staffed_communities.html"
        return super(UserStaffCommunities,self).get(request,*args,**kwargs)

    def get_context_data(self, **kwargs):
        context = super(UserStaffCommunities, self).get_context_data(**kwargs)
        context['user'] = self.user
        return context

    def get_queryset(self):
        communities_list = self.user.get_staffed_communities()
        return communities_list


class UserMobStaffed(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.user = User.objects.get(pk=self.kwargs["pk"])
        if self.user == request.user:
            self.template_name = "mob_user_community/staffed.html"
        return super(UserMobStaffed,self).get(request,*args,**kwargs)

    def get_context_data(self, **kwargs):
        context = super(UserMobStaffed, self).get_context_data(**kwargs)
        context['user'] = self.user
        return context


class UserMusic(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        from music.models import SoundList

        self.user = User.objects.get(pk=self.kwargs["pk"])
        self.playlist = SoundList.objects.get(creator_id=self.user.pk, community=None, type=SoundList.MAIN)

        self.template_name = get_template_user_music(self.user, "user_music/", "music.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + self.template_name
        return super(UserMusic,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(UserMusic,self).get_context_data(**kwargs)
        context['user'] = self.user
        context['playlist'] = self.playlist
        return context

    def get_queryset(self):
        music_list = self.playlist.playlist_too()
        return music_list


class UserDocs(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        from docs.models import DocList

        self.user = User.objects.get(pk=self.kwargs["pk"])
        try:
            list = DocList.objects.get(creator_id=self.user.id, community=None, type=DocList.MAIN)
        except:
            list = DocList.objects.create(creator_id=self.user.id, community=None, type=DocList.MAIN, name="Основной список")
        if self.user.pk == request.user.pk:
            self.doc_list = self.list.get_my_docs()
        else:
            self.doc_list = self.list.get_docs()

        self.template_name = get_template_user_music(self.user, "user_docs/", "docs.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + self.template_name
        return super(UserDocs,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(UserDocs,self).get_context_data(**kwargs)
        context['user'] = self.user
        context['list'] = self.list
        return context

    def get_queryset(self):
        doc_list = self.doc_list
        return doc_list


class UserVideo(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        from video.models import VideoAlbum

        self.user = User.objects.get(pk=self.kwargs["pk"])

        self.album = VideoAlbum.objects.get(creator_id=self.user.pk, community=None, type=VideoAlbum.MAIN)
        if self.user == request.user:
            self.video_list = self.album.get_my_queryset()
        else:
            self.video_list = self.album.get_queryset()
        self.template_name = get_template_user_video(self.user, "user_video_list/", "list.html", request.user)

        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + self.template_name
        return super(UserVideo,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(UserVideo,self).get_context_data(**kwargs)
        context['user'] = self.user
        context['album'] = self.album
        return context

    def get_queryset(self):
        video_list = self.video_list
        return video_list


class ProfileUserView(TemplateView):
    template_name = None
    get_buttons_block = None

    def get(self,request,*args,**kwargs):
        from stst.models import UserNumbers
        from users.model.list import UserPopulateFriend

        self.user = User.objects.get(pk=self.kwargs["pk"])

        if request.user.is_authenticated:
            if request.user.is_no_phone_verified():
                self.template_name = "main/phone_verification.html"
            elif self.user.pk == request.user.pk:
                if self.user.is_suspended():
                    self.template_name = "generic/u_template/you_suspended.html"
                elif self.user.is_blocked():
                    self.template_name = "generic/u_template/you_global_block.html"
                elif self.user.is_child():
                    self.template_name = "account/my_user_child.html"
                else:
                    self.template_name = "account/my_user.html"
            elif request.user.pk != self.user.pk:
                self.get_buttons_block = request.user.get_buttons_profile(self.user.pk)
                if self.user.is_suspended():
                    self.template_name = "generic/u_template/user_suspended.html"
                elif self.user.is_blocked():
                    self.template_name = "generic/u_template/user_global_block.html"
                elif request.user.is_user_manager() or request.user.is_superuser:
                    self.template_name = "account/staff_user.html"
                    self.get_buttons_block = request.user.get_staff_buttons_profile(self.user.pk)
                    if request.user.is_connected_with_user_with_id(user_id=self.user.pk):
                        request.user.create_or_plus_populate_friend(self.user.pk)
                elif request.user.is_blocked_with_user_with_id(user_id=self.user.pk):
                    self.template_name = "account/block_user.html"
                elif request.user.is_connected_with_user_with_id(user_id=self.user.pk):
                    self.template_name = "account/user.html"
                    request.user.create_or_plus_populate_friend(self.user.pk)
                elif self.user.is_closed_profile():
                    if request.user.is_followers_user_with_id(user_id=self.user.pk) or request.user.is_connected_with_user_with_id(user_id=self.user.pk):
                        self.template_name = "account/user.html"
                    else:
                        self.template_name = "account/close_user.html"
                elif request.user.is_child() and not self.user.is_child_safety():
                    self.template_name = "account/no_child_safety.html"
                else:
                    self.template_name = "account/user.html"
                if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
                    UserNumbers.objects.create(visitor=request.user.pk, target=self.user.pk, platform=0)
                else:
                    UserNumbers.objects.create(visitor=request.user.pk, target=self.user.pk, platform=1)
        elif request.user.is_anonymous:
            if self.user.is_suspended():
                self.template_name = "generic/u_template/anon_user_suspended.html"
            elif self.user.is_blocked():
                self.template_name = "generic/u_template/anon_user_global_block.html"
            elif self.user.is_closed_profile():
                self.template_name = "account/anon_close_user.html"
            elif not self.user.is_child_safety():
                self.template_name = "account/anon_no_child_safety.html"
            else:
                self.template_name = "account/anon_user.html"

        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + self.template_name
        return super(ProfileUserView,self).get(request,*args,**kwargs)

    def get_context_data(self, **kwargs):
        context = super(ProfileUserView, self).get_context_data(**kwargs)
        context['user'] = self.user
        context['communities'] = self.user.get_6_communities()
        context['get_buttons_block'] = self.get_buttons_block
        if self.request.user.is_authenticated:
            context['common_frends'] = self.user.get_common_friends_of_user(self.request.user)[0:5]
        return context

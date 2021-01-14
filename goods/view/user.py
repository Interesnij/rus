import re
MOBILE_AGENT_RE = re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
from django.views.generic import TemplateView
from django.views.generic import ListView
from goods.models import Good, GoodAlbum
from users.models import User
from stst.models import GoodNumbers
from common.template.good import get_template_user_good, get_permission_user_good
from django.http import Http404


class UserLoadGoodAlbum(ListView):
	template_name, paginate_by = None, 15

	def get(self,request,*args,**kwargs):
		self.album = GoodAlbum.objects.get(uuid=self.kwargs["uuid"])
		self.template_name = get_template_user_good(self.album, "goods/user/", "list.html", request.user, request.META['HTTP_USER_AGENT'])
		return super(UserLoadGoodAlbum,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		c = super(UserLoadGoodAlbum,self).get_context_data(**kwargs)
		c['user'], c['album'] = self.album.creator, self.album
		return c

	def get_queryset(self):
		list = self.album.get_goods()
		return list


class UserGood(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.good, self.album = Good.objects.get(pk=self.kwargs["pk"]), GoodAlbum.objects.get(uuid=self.kwargs["uuid"])
        self.goods, self.user, user_agent = self.album.get_goods(), self.album.creator, request.META['HTTP_USER_AGENT']

        if request.user.is_authenticated:
            if request.user.is_no_phone_verified():
                self.template_name = "main/phone_verification.html"
            elif self.user.pk == request.user.pk:
                if self.user.is_suspended():
                    self.template_name = "generic/u_template/you_suspended.html"
                elif self.user.is_blocked():
                    self.template_name = "generic/u_template/you_global_block.html"
                else:
                    self.template_name = "goods/u_good/my_good.html"
            elif request.user.pk != self.user.pk:
                self.get_buttons_block = request.user.get_buttons_profile(self.user.pk)
                if self.user.is_suspended():
                    self.template_name = "generic/u_template/user_suspended.html"
                elif self.user.is_blocked():
                    self.template_name = "generic/u_template/user_global_block.html"
                elif request.user.is_user_manager() or request.user.is_superuser:
                    self.template_name, self.get_buttons_block = "goods/u_good/staff_good.html", request.user.get_staff_buttons_profile(self.user.pk)
                elif request.user.is_blocked_with_user_with_id(user_id=self.user.pk):
                    self.template_name = "generic/u_template/block_user.html"
                elif self.user.is_closed_profile():
                    if request.user.is_followers_user_with_id(user_id=self.user.pk) or request.user.is_connected_with_user_with_id(user_id=self.user.pk):
                        self.template_name = "goods/u_good/good.html"
                    else:
                        self.template_name = "generic/u_template/close_user.html"
                elif request.user.is_child() and not self.user.is_child_safety():
                    self.template_name = "generic/u_template/no_child_safety.html"
                else:
                    self.template_name = "goods/u_good/good.html"
            try:
                GoodNumbers.objects.filter(user=request.user.pk, good=self.good.pk).exists()
            except:
                if MOBILE_AGENT_RE.match(user_agent):
                    GoodNumbers.objects.create(user=request.user.pk, good=self.good.pk, platform=0)
                else:
                    GoodNumbers.objects.create(user=request.user.pk, good=self.good.pk, platform=1)
        elif request.user.is_anonymous:
            if self.user.is_suspended():
                template_name = "generic/u_template/anon_user_suspended.html"
            elif self.user.is_blocked():
                template_name = "generic/u_template/anon_user_global_block.html"
            elif self.user.is_closed_profile():
                template_name = "generic/u_template/anon_close_user.html"
            elif not self.user.is_child_safety():
                template_name = "generic/u_template/anon_no_child_safety.html"
            else:
                self.template_name = "goods/u_good/anon_good.html"

        if MOBILE_AGENT_RE.match(user_agent):
            self.template_name = "mobile/" + self.template_name
        else:
            self.template_name = "mobile/" + self.template_name
        return super(UserGood,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(UserGood,self).get_context_data(**kwargs)
        context["object"] = self.good
        context["album"] = self.album
        context["user"] = self.user
        context["next"] = self.goods.filter(pk__gt=self.good.pk).order_by('pk').first()
        context["prev"] = self.goods.filter(pk__lt=self.good.pk).order_by('-pk').first()
        return context


class GoodUserCommentList(ListView):
    template_name, paginate_by = None, 15

    def get(self,request,*args,**kwargs):
        self.good, self.user = Good.objects.get(pk=self.kwargs["good_pk"]), User.objects.get(pk=self.kwargs["pk"])
        self.template_name = get_permission_user_good(self.user, "goods/u_good_comment/", "comments.html", request.user, request.META['HTTP_USER_AGENT'])
        if not request.is_ajax() or not self.good.comments_enabled:
            raise Http404
        return super(GoodUserCommentList,self).get(request,*args,**kwargs)

    def get_context_data(self, **kwargs):
        context = super(GoodUserCommentList, self).get_context_data(**kwargs)
        context['parent'] = self.good
        context['user'] = self.user
        return context

    def get_queryset(self):
        comments = self.good.get_comments()
        return comments


class GoodUserDetail(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.good, self.user = Good.objects.get(pk=self.kwargs["good_pk"]), User.objects.get(pk=self.kwargs["pk"])
        self.template_name = get_permission_user_good(self.user, "goods/u_good/", "detail.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(GoodUserDetail,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodUserDetail,self).get_context_data(**kwargs)
        context["object"], context["user"] = self.good, self.user
        return context

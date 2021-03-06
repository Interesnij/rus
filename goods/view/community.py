from django.views.generic import TemplateView
from django.views.generic import ListView
from goods.models import Good, GoodAlbum
from communities.models import Community
from common.check.community import check_can_get_lists
from stst.models import GoodNumbers
from common.template.good import get_template_community_good
from django.http import Http404


class CommunityLoadGoodAlbum(ListView):
	template_name, paginate_by = None, 15

	def get(self,request,*args,**kwargs):
		self.c, self.album = Community.objects.get(pk=self.kwargs["pk"]), GoodAlbum.objects.get(uuid=self.kwargs["uuid"])
		if self.album.community:
			self.template_name = get_template_community_good(self.album, "goods/community/", "list.html", request.user, request.META['HTTP_USER_AGENT'])
		else:
			from common.template.good import get_template_user_good
			self.template_name = get_template_user_good(self.album, "goods/user/", "list.html", request.user, request.META['HTTP_USER_AGENT'])
		return super(CommunityLoadGoodAlbum,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		c = super(CommunityLoadGoodAlbum,self).get_context_data(**kwargs)
		c['community'], c['album'] = self.c, self.album
		return c

	def get_queryset(self):
		list = self.album.get_goods()
		return list


class CommunityGood(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.album, self.good = GoodAlbum.objects.get(uuid=self.kwargs["uuid"]), Good.objects.get(pk=self.kwargs["pk"])
        self.goods = self.album.get_goods()
        check_can_get_lists(self.request.user, self.album.community)

        self.template_name = get_template_community_good(self.album.community, "goods/c_good/", "good.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(CommunityGood,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunityGood,self).get_context_data(**kwargs)
        context["object"] = self.good
        context["album"] = self.album
        context["community"] = self.album.community
        context["next"] = self.goods.filter(pk__gt=self.good.pk).order_by('pk').first()
        context["prev"] = self.goods.filter(pk__lt=self.good.pk).order_by('-pk').first()
        return context


class GoodCommunityCommentList(ListView):
	template_name, paginate_by = None, 15

	def get(self,request,*args,**kwargs):
		from common.template.good import get_permission_community_good_2

		self.good, self.c = Good.objects.get(pk=self.kwargs["good_pk"]), Community.objects.get(pk=self.kwargs["pk"])
		check_can_get_lists(self.request.user, self.c)
		if not request.is_ajax() or not self.good.comments_enabled:
			raise Http404
		self.template_name = get_permission_community_good_2(self.c, "goods/c_good_comment/", "comments.html", request.user, request.META['HTTP_USER_AGENT'])
		return super(GoodCommunityCommentList,self).get(request,*args,**kwargs)

	def get_context_data(self, **kwargs):
		context = super(GoodCommunityCommentList, self).get_context_data(**kwargs)
		context['parent'] = self.good
		context['community'] = self.c
		return context

	def get_queryset(self):
		comments = self.good.get_comments()
		return comments


class GoodCommunityDetail(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.good, self.c = Good.objects.get(pk=self.kwargs["good_pk"]), Community.objects.get(pk=self.kwargs["pk"])
        self.template_name = get_template_community_good(self.c, "goods/c_good/", "detail.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(GoodCommunityDetail,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodCommunityDetail,self).get_context_data(**kwargs)
        context["object"], context["community"] = self.good, self.c
        return context

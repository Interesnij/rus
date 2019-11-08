from django.views.generic import ListView
from users.models import User
from main.models import Item
from follows.models import CommunityFollow
from communities.models import *
from django.views.generic.detail import DetailView
from django.views.generic.base import TemplateView
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from communities.forms import CommunityForm
from generic.mixins import CategoryListMixin
from django.views import View
from notifications.models import CommunityNotification, community_notification_handler


class CommunitiesView(ListView):
	template_name="communities.html"
	model=Community
	paginate_by=15

	def get_queryset(self):
		self.user=User.objects.get(pk=self.kwargs["pk"])
		groups=Community.objects.filter(memberships__user__id=self.user.pk)
		return groups


class CommunityMembersView(ListView):
	template_name="members.html"
	model=Community
	paginate_by=15
	administrator = False
	creator = False

	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		if request.user.is_authenticated and request.user.is_administrator_of_community_with_name(self.community.name):
			self.administrator=True
		if request.user.is_authenticated and request.user.is_creator_of_community_with_name(self.community.name):
			self.creator=True
		return super(CommunityMembersView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityMembersView,self).get_context_data(**kwargs)
		context["administrator"]=self.administrator
		context["community"]=self.community
		context["creator"]=self.creator
		return context

	def get_queryset(self):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		membersheeps=CommunityMembership.objects.filter(community__id=self.community.pk)
		return membersheeps

class CommunityDetailView(DetailView):
	template_name = "community_detail.html"
	model = Community
	administrator = False
	staff = False
	creator = False
	member = False

	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		self.membersheeps=CommunityMembership.objects.filter(community__id=self.community.pk)[0:5]
		if request.user.is_authenticated and request.user.is_administrator_of_community_with_name(self.community.name):
			self.administrator=True
		if request.user.is_authenticated and request.user.is_staff_of_community_with_name(self.community.name):
			self.staff=True
		if request.user.is_authenticated and request.user.is_creator_of_community_with_name(self.community.name):
			self.creator=True
		if request.user.is_authenticated and request.user.is_member_of_community_with_name(self.community.name):
			self.member=True
		try:
			self.follow = CommunityFollow.objects.get(community=self.community,user=self.request.user)
		except:
			self.follow = None
		return super(CommunityDetailView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityDetailView,self).get_context_data(**kwargs)
		context["membersheeps"]=self.membersheeps
		context["administrator"]=self.administrator
		context["creator"]=self.creator
		context["staff"]=self.staff
		context["member"]=self.member
		context["follow"]=self.follow
		return context


class GygView(TemplateView):
	template_name="gygyg.html"

	def get(self,request,*args,**kwargs):
		self.new_community = Community.objects.only('id').last()
		self.new_url = self.new_community.pk
		return super(GygView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(GygView,self).get_context_data(**kwargs)
		context["new_url"]=self.new_url
		return context


class CommunityDetailReload(DetailView):
	template_name="detail_reload.html"
	model=Community
	administrator = False
	staff = False
	creator = False
	member = False

	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		self.membersheeps=CommunityMembership.objects.filter(community__id=self.community.pk)[0:5]
		if request.user.is_authenticated and request.user.is_administrator_of_community_with_name(self.community.name):
			self.administrator=True
		if request.user.is_authenticated and request.user.is_staff_of_community_with_name(self.community.name):
			self.staff=True
		if request.user.is_authenticated and request.user.is_creator_of_community_with_name(self.community.name):
			self.creator=True
		if request.user.is_authenticated and request.user.is_member_of_community_with_name(self.community.name):
			self.member=True
		return super(CommunityDetailReload,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityDetailReload,self).get_context_data(**kwargs)
		context["membersheeps"]=self.membersheeps
		context["administrator"]=self.administrator
		context["creator"]=self.creator
		context["staff"]=self.staff
		context["member"]=self.member
		return context


class AllCommunities(ListView):
	template_name="all_communities.html"
	model=Community
	paginate_by=15

	def get_queryset(self):
		groups=Community.objects.all()
		return groups


class CommunityCreate(TemplateView):
	template_name="community_add.html"
	form=None
	categories = CommunityCategory.objects.only("id")

	def get(self,request,*args,**kwargs):
		self.form=CommunityForm()
		self.new_community = Community.objects.only('id').last()
		self.new_url = self.new_community.pk + 1
		return super(CommunityCreate,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityCreate,self).get_context_data(**kwargs)
		context["form"]=self.form
		context["categories"]=self.categories
		context["new_url"]=self.new_url
		return context

	def post(self,request,*args,**kwargs):
		self.form=CommunityForm(request.POST)
		if self.form.is_valid():
			new_community=self.form.save(commit=False)
			Community.create_community(
										name=new_community.name,
										category=new_community.category,
										type=new_community.type,
										creator=request.user
										)
			if request.is_ajax() :
				return HttpResponse("!")
		else:
			return HttpResponseBadRequest()
		return super(CommunityCreate,self).get(request,*args,**kwargs)


class CommunitiesCatsView(TemplateView):
	template_name="communities_cats.html"
	categ = None

	def get(self,request,*args,**kwargs):
		self.categ = CommunitySubCategory.objects.filter(sudcategory__order=self.kwargs["order"])
		return super(CommunitiesCatsView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunitiesCatsView,self).get_context_data(**kwargs)
		context["categ"]=self.categ
		return context


class CommunityItemView(CategoryListMixin, TemplateView):
    model=Item
    template_name="community/item.html"

    def get(self,request,*args,**kwargs):
        self.item = Item.objects.get(pk=self.kwargs["pk"])
        self.item.views += 1
        self.item.save()
        return super(CommunityItemView,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(CommunityItemView,self).get_context_data(**kwargs)
        context["object"]=self.item
        return context


class CommunityListView(ListView):
	template_name="community/list.html"
	model=Item
	paginate_by=15

	def get(self,request,*args,**kwargs):
		try:
			self.fixed = Item.objects.get(community=self.community, is_fixed=True)
		except:
			self.fixed = None
		return super(CommunityListView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		self.community=Community.objects.get(pk=self.kwargs["pk"])
		communities = self.community.get_posts()
		return communities

	def get_context_data(self, **kwargs):
		context = super(CommunityListView, self).get_context_data(**kwargs)
		context['object'] = self.fixed
		return context


class CommunityMemberCreate(View):
	success_url = "/"
	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		new_member = request.user.join_community_with_name(self.community.name)
		self.community.notification_new_member(request.user)
		return HttpResponse("!")

class CommunityMemberDelete(View):
	success_url = "/"
	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		request.user.leave_community_with_name(self.community.name)
		return HttpResponse("!")

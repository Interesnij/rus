from django.views.generic.base import TemplateView
from communities.models import *
from django.views import View
from django.http import HttpResponse, HttpResponseBadRequest
from communities.forms import CommunityForm
from gallery.models import Album
from users.models import User


class CommunityCreate(TemplateView):
	template_name="community_add.html"
	form=None
	categories = CommunityCategory.objects.only("id")

	def get(self,request,*args,**kwargs):
		self.form=CommunityForm()
		try:
			self.new_community = Community.objects.only('id').last()
			self.new_url = self.new_community.pk + 1
		except:
			self.new_url = 1
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
			community = Community.create_community(name=new_community.name,category=new_community.category,type=new_community.type,creator=request.user)
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


class CommunityMemberCreate(View):
	success_url = "/"
	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		new_member = self.user.join_community_with_name(self.community.name)
		return HttpResponse("!")

class CommunityMemberDelete(View):
	success_url = "/"
	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		self.user.leave_community_with_name(self.community.name)
		return HttpResponse("!")


class CommunityAdminCreate(View):
	success_url = "/"
	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		new_admin = self.community.add_administrator(self.user)
		return HttpResponse("!")

class CommunityAdminDelete(View):
	success_url = "/"
	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(pk=self.kwargs["pk"])
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		new_admin = self.community.remove_administrator(self.user)
		return HttpResponse("!")


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

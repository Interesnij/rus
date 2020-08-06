from django.views.generic.base import TemplateView
from django.views.generic import ListView
from django.http import Http404
from common.user_progs.timelines import *


class PostListView(ListView):
	template_name = None
	paginate_by = 15

	def get(self,request,*args,**kwargs):
		if request.user.is_authenticated:
			self.template_name = request.user.get_settings_template(folder="news_list/", template="posts.html", request=request)
		else:
			self.template_name = "main/auth.html"
		return super(PostListView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		if self.request.user.is_authenticated:
			items = get_timeline_posts_for_user(self.request.user)
		else:
			items = []
		return items

class FeaturedPostsView(ListView):
	template_name = None
	paginate_by = 15

	def get(self,request,*args,**kwargs):
		if request.user.is_authenticated:
			self.template_name = request.user.get_settings_template(folder="news_list/", template="featured_posts.html", request=request)
		else:
			self.template_name = 'main/auth.html'
		return super(FeaturedPostsView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		if self.request.user.is_authenticated:
			items = get_timeline_posts_for_possible_users(self.request.user)
		else:
			items = None
		return items


class ComingView(TemplateView):
	template_name = "base_coming.html"


class MainPhoneSend(TemplateView):
	template_name = "phone_verification.html"

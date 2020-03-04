from users.models import User
from django.views import View
from django.http import HttpResponse
from django.views.generic import ListView


class FrendsListView(ListView):
	template_name = None
	paginate_by = 30

	def get(self,request,*args,**kwargs):
		self.user=User.objects.get(pk=self.kwargs["pk"])
		self.template_name = self.user.get_template_user(folder="frends/", template="frends.html", request=request)
		return super(FrendsListView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context = super(FrendsListView,self).get_context_data(**kwargs)
		context['user'] = self.user
		return context

	def get_queryset(self):
		friends_list=self.user.get_all_connection()
		return friends_list

class OnlineFrendsListView(ListView):
	template_name = None
	paginate_by = 30

	def get(self,request,*args,**kwargs):
		self.user=User.objects.get(pk=self.kwargs["pk"])
		self.template_name = self.user.get_template_user(folder="frends_online/", template="frends.html", request=request)
		return super(OnlineFrendsListView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context = super(OnlineFrendsListView,self).get_context_data(**kwargs)
		context['user'] = self.user
		return context

	def get_queryset(self):
		friends_list=self.user.get_online_connection()
		return friends_list

class CommonFrendsListView(ListView):
	template_name = None
	paginate_by = 30

	def get(self,request,*args,**kwargs):
		self.user=User.objects.get(pk=self.kwargs["pk"])
		self.template_name = self.user.get_template_user(folder="frends_common/", template="frends.html", request=request)
		return super(CommonFrendsListView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context = super(CommonFrendsListView,self).get_context_data(**kwargs)
		context['user'] = self.user
		return context

	def get_queryset(self):
		friends_list=self.user.get_common_friends_of_user(self.request.user)
		return friends_list


class ConnectCreate(View):
	success_url = "/"

	def get(self,request,*args,**kwargs):
		self.target_user = User.objects.get(pk=self.kwargs["pk"])
		new_frend = request.user.frend_user(self.target_user)
		new_frend.notification_connect(request.user)
		return HttpResponse("!")


class ConnectDelete(View):
	success_url = "/"

	def get(self,request,*args,**kwargs):
		self.target_user = User.objects.get(pk=self.kwargs["pk"])
		request.user.unfrend_user(self.target_user)
		return HttpResponse("!")

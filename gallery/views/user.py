from django.views.generic.base import TemplateView
from users.models import User
from gallery.models import Album, Photo
from gallery.helpers import AjaxResponseMixin, JSONResponseMixin
from django.views.generic import ListView
from gallery.forms import AlbumForm
from django.http import HttpResponse, HttpResponseBadRequest
from django.views import View
from generic.mixins import EmojiListMixin
from common.checkers import check_is_not_blocked_with_user_with_id, check_is_connected_with_user_with_id
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response
from rest_framework.exceptions import PermissionDenied


class UserGalleryView(TemplateView):
	template_name="good_user/gallery.html"

	def get(self,request,*args,**kwargs):
		self.user=User.objects.get(pk=self.kwargs["pk"])
		self.albums=Album.objects.filter(creator=self.user)
		return super(UserGalleryView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(UserGalleryView,self).get_context_data(**kwargs)
		context['user'] = self.user
		return context

class UserAlbumsList(View):
	def get(self,request,**kwargs):
		context = {}
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		if self.user != request.user and request.user.is_authenticated:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
			if self.user.is_closed_profile:
				check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
			albums_list = self.user.get_albums().order_by('-created')
			current_page = Paginator(albums_list, 12)
		if request.user.is_anonymous and self.user.is_closed_profile():
			raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')
		if request.user.is_anonymous and not self.user.is_closed_profile():
			albums_list = self.user.get_albums().order_by('-created')
			current_page = Paginator(albums_list, 12)
		if self.user == request.user:
			albums_list = self.user.get_albums().order_by('-created')
			current_page = Paginator(albums_list, 12)

		page = request.GET.get('page')
		context['user'] = self.user
		try:
			context['albums_list'] = current_page.page(page)
		except PageNotAnInteger:
			context['albums_list'] = current_page.page(1)
		except EmptyPage:
			context['albums_list'] = current_page.page(current_page.num_pages)
		return render_to_response('good_user/albums.html', context)


class UserPhotosList(View):
	def get(self,request,**kwargs):
		context = {}
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		if self.user != request.user and request.user.is_authenticated:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
			if self.user.is_closed_profile:
				check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
			photo_list = self.user.get_photos().order_by('-created')
			current_page = Paginator(photo_list, 12)
		if request.user.is_anonymous and self.user.is_closed_profile():
			raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.',)
		if request.user.is_anonymous and not self.user.is_closed_profile():
			photo_list = self.user.get_photos().order_by('-created')
			current_page = Paginator(photo_list, 12)
		if self.user == request.user:
			photo_list = self.user.get_photos().order_by('-created')
			current_page = Paginator(photo_list, 12)

		page = request.GET.get('page')
		context['user'] = self.user
		try:
			context['photo_list'] = current_page.page(page)
		except PageNotAnInteger:
			context['photo_list'] = current_page.page(1)
		except EmptyPage:
			context['photo_list'] = current_page.page(current_page.num_pages)
		return render_to_response('good_user/photos.html', context)


class UserPhoto(EmojiListMixin, TemplateView):
	template_name="good_user/photo.html"

	def get(self,request,*args,**kwargs):
		self.user=User.objects.get(uuid=self.kwargs["uuid"])
		self.photo = Photo.objects.get(pk=self.kwargs["pk"])
		if self.user != request.user and request.user.is_authenticated:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
			if self.user.is_closed_profile:
				check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
			self.photos = self.user.get_photos()
			self.next = self.photos.filter(pk__gt=self.photo.pk).order_by('pk').first()
			self.prev = self.photos.filter(pk__lt=self.photo.pk).order_by('-pk').first()
		elif request.user.is_anonymous and self.user.is_closed_profile():
			raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')
		elif request.user.is_anonymous and not self.user.is_closed_profile():
			self.photos = self.user.get_photos()
			self.next = self.photos.filter(pk__gt=self.photo.pk).order_by('pk').first()
			self.prev = self.photos.filter(pk__lt=self.photo.pk).order_by('-pk').first()
		return super(UserPhoto,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(UserPhoto,self).get_context_data(**kwargs)
		context["object"]=self.photo
		context["user"]=self.user
		context["next"]=self.next
		context["prev"]=self.prev
		return context


class UserAlbomView(View):
	def get(self,request,**kwargs):
		context = {}
		self.album=Album.objects.get(uuid=self.kwargs["uuid"])
		self.user=User.objects.get(pk=self.kwargs["pk"])
		if self.user != request.user and request.user.is_authenticated:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
			if self.user.is_closed_profile:
				check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
			photos = Photo.objects.filter(album=self.album).order_by('-created')
			current_page = Paginator(photos, 12)
		if request.user.is_anonymous and self.user.is_closed_profile():
			raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')
		else:
			photos = Photo.objects.filter(album=self.album).order_by('-created')
			current_page = Paginator(photos, 12)

		page = request.GET.get('page')
		context['user'] = self.user
		try:
			context['photos'] = current_page.page(page)
		except PageNotAnInteger:
			context['photos'] = current_page.page(1)
		except EmptyPage:
			context['photos'] = current_page.page(current_page.num_pages)
		return render_to_response('good_user/album.html', context)


class UserAlbomReload(TemplateView):
	template_name="good_user/album_reload.html"

	def get(self,request,*args,**kwargs):
		self.album=Album.objects.get(uuid=self.kwargs["uuid"])
		self.photos = Photo.objects.filter(album=self.album)
		return super(UserAlbomReload,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(UserAlbomReload,self).get_context_data(**kwargs)
		context['album'] = self.album
		context['photos'] = self.photos
		return context


class PhotoUserCreate(View,AjaxResponseMixin,JSONResponseMixin):

	def post(self, request, *args, **kwargs):
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		try:
			self.album = Album.objects.get(pk=self.kwargs["pk"])
		except:
			self.album = None

		uploaded_file = request.FILES['file']
		Photo.objects.create(album=self.album, file=uploaded_file, creator=self.user)

		response_dict = {'message': 'File uploaded successfully!',}
		return self.render_json_response(response_dict, status=200)


class AlbumUserCreate(TemplateView):
	template_name="good_user/add_album.html"
	form=None

	def get(self,request,*args,**kwargs):
		self.form=AlbumForm()
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		return super(AlbumUserCreate,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(AlbumUserCreate,self).get_context_data(**kwargs)
		context["form"]=self.form
		context["user"]=self.user
		return context

	def post(self,request,*args,**kwargs):
		self.form = AlbumForm(request.POST)
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		if self.form.is_valid():
			new_album = self.form.save(commit=False)
			new_album.creator=self.user
			new_album = self.form.save()
			if request.is_ajax() :
				return HttpResponse("!")
		else:
			return HttpResponseBadRequest()
		return super(AlbumUserCreate,self).get(request,*args,**kwargs)


class AlbomGygView(TemplateView):
	template_name="good_user/gygyg.html"

	def get(self,request,*args,**kwargs):
		self.user = User.objects.get(uuid=self.kwargs["uuid"])
		self.album = Album.objects.filter(creator=self.user)
		self.new_url = self.album.last().uuid
		return super(AlbomGygView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(AlbomGygView,self).get_context_data(**kwargs)
		context["new_url"]=self.new_url
		context["album"]=self.album
		return context

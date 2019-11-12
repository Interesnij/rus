from django.views.generic.base import TemplateView
from users.models import User
from communities.models import Community
from gallery.models import Album, Photo
from gallery.helpers import AjaxResponseMixin, JSONResponseMixin
from django.views.generic import ListView
from gallery.forms import AlbumForm
from django.http import HttpResponse, HttpResponseBadRequest
from django.views import View
from generic.mixins import EmojiListMixin
from common.checkers import check_can_get_posts_for_community_with_name
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response


class CommunityGalleryView(TemplateView):
	template_name="good_community/gallery.html"

	def get(self,request,*args,**kwargs):
		self.community=Community.objects.get(pk=self.kwargs["pk"])
		self.albums=Album.objects.filter(creator=self.user)
		return super(CommunityGalleryView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityGalleryView,self).get_context_data(**kwargs)
		context['community'] = self.community
		return context

class CommunityAlbumsList(ListView):
	template_name="good_community/albums.html"
	model=Album
	paginate_by=10

	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(uuid=self.kwargs["uuid"])
		if self.user != request.user:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
			if self.user.is_closed_profile:
				check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
		self.albums = self.user.get_albums()
		return super(CommunityAlbumsList,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityAlbumsList,self).get_context_data(**kwargs)
		context['albums'] = self.albums
		context['community'] = self.community
		return context


class CommunityPhotosList(View):
	def get(self,request,**kwargs):
		context = {}
		self.community = Community.objects.get(uuid=self.kwargs["uuid"])
		if self.user != request.user:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
			if self.user.is_closed_profile:
				check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
		photo_list = self.community.get_photos().order_by('-created')
		current_page = Paginator(photo_list, 12)
		page = request.GET.get('page')
		context['community'] = self.community
		try:
			context['items_list'] = current_page.page(page)
		except PageNotAnInteger:
			context['items_list'] = current_page.page(1)
		except EmptyPage:
			context['items_list'] = current_page.page(current_page.num_pages)
		return render_to_response('good_community/photos.html', context)


class CommunityPhoto(EmojiListMixin, TemplateView):
	template_name="good_community/photo.html"

	def get(self,request,*args,**kwargs):
		self.community=Community.objects.get(uuid=self.kwargs["uuid"])
		if self.user != request.user:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
			if self.user.is_closed_profile:
				check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
		self.photos = self.community.get_photos()
		self.photo = Photo.objects.get(pk=self.kwargs["pk"])
		self.next = self.photos.filter(pk__gt=self.photo.pk).order_by('pk').first()
		self.prev = self.photos.filter(pk__lt=self.photo.pk).order_by('-pk').first()
		return super(CommunityPhoto,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityPhoto,self).get_context_data(**kwargs)
		context["object"]=self.photo
		context["community"]=self.community
		context["next"]=self.next
		context["prev"]=self.prev
		return context


class CommunityAlbomView(TemplateView):
	template_name="good_community/album.html"

	def get(self,request,*args,**kwargs):
		self.album=Album.objects.get(uuid=self.kwargs["uuid"])
		self.photos = Photo.objects.filter(album=self.album)
		return super(CommunityAlbomView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityAlbomView,self).get_context_data(**kwargs)
		context['album'] = self.album
		context['photos'] = self.photos
		return context


class CommunityAlbomReload(TemplateView):
	template_name="good_community/album_reload.html"

	def get(self,request,*args,**kwargs):
		self.album=Album.objects.get(uuid=self.kwargs["uuid"])
		self.photos = Photo.objects.filter(album=self.album)
		return super(CommunityAlbomReload,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityAlbomReload,self).get_context_data(**kwargs)
		context['album'] = self.album
		context['photos'] = self.photos
		return context


class PhotoCommunityCreate(View,AjaxResponseMixin,JSONResponseMixin):

	def post(self, request, *args, **kwargs):
		self.community = Community.objects.get(uuid=self.kwargs["uuid"])
		try:
			self.album = Album.objects.get(pk=self.kwargs["pk"])
		except:
			self.album = None

		uploaded_file = request.FILES['file']
		Photo.objects.create(album=self.album, file=uploaded_file, creator=request.user, community=self.community)

		response_dict = {'message': 'File uploaded successfully!',}
		return self.render_json_response(response_dict, status=200)


class AlbumCommunityCreate(TemplateView):
	template_name="good_community/add_album.html"
	form=None

	def get(self,request,*args,**kwargs):
		self.form=AlbumForm()
		self.community = Community.objects.get(uuid=self.kwargs["uuid"])
		return super(AlbumCommunityCreate,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(AlbumCommunityCreate,self).get_context_data(**kwargs)
		context["form"]=self.form
		context["community"]=self.community
		return context

	def post(self,request,*args,**kwargs):
		self.form = AlbumForm(request.POST)
		self.community = Community.objects.get(uuid=self.kwargs["uuid"])
		if self.form.is_valid():
			new_album = self.form.save(commit=False)
			new_album.creator=request.user
			new_album = self.form.save()
			if request.is_ajax() :
				return HttpResponse("!")
		else:
			return HttpResponseBadRequest()
		return super(AlbumCommunityCreate,self).get(request,*args,**kwargs)


class CommunityAlbomGygView(TemplateView):
	template_name="good_community/gygyg.html"

	def get(self,request,*args,**kwargs):
		self.community = Community.objects.get(uuid=self.kwargs["uuid"])
		self.album = Album.objects.filter(creator=self.user)
		self.new_url = self.album.last().uuid
		return super(CommunityAlbomGygView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(CommunityAlbomGygView,self).get_context_data(**kwargs)
		context["new_url"]=self.new_url
		context["album"]=self.album
		return context

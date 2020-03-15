from django.views.generic.base import TemplateView
from users.models import User
from main.models import ItemComment
from gallery.models import Album, Photo
from django.http import HttpResponse, HttpResponseBadRequest
from common.checkers import check_is_not_blocked_with_user_with_id, check_is_connected_with_user_with_id
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response
from rest_framework.exceptions import PermissionDenied
from gallery.forms import PhotoDescriptionForm
from common.utils import is_mobile


class UserPhoto(TemplateView):
    """
    страница отдельного фото в списке или везде для пользователя с разрещениями и без
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.user=User.objects.get(uuid=self.kwargs["uuid"])
        self.photo = Photo.objects.get(pk=self.kwargs["pk"])
        self.photos = self.user.get_photos()
        self.template_name = self.user.get_permission_list_user(folder="photo_user/", template="photo.html", request=request)
        self.form_image = PhotoDescriptionForm(instance=self.photo)
        self.avatar = self.photo.is_avatar(request.user)
        self.next = self.photos.filter(pk__gt=self.photo.pk).order_by('pk').first()
        self.prev = self.photos.filter(pk__lt=self.photo.pk).order_by('-pk').first()
        return super(UserPhoto,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(UserPhoto,self).get_context_data(**kwargs)
        context["object"]=self.photo
        context["user"]=self.user
        context["next"]=self.next
        context["prev"]=self.prev
        context["avatar"]=self.avatar
        context["form_image"]=self.form_image
        return context


class UserAlbumPhoto(TemplateView):
    """
    страница отдельного фото в альбоме для пользователя с разрещениями и без
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.user=User.objects.get(uuid=self.kwargs["uuid"])
        self.album=Album.objects.get(uuid=self.kwargs["album_uuid"])
        self.photo = Photo.objects.get(pk=self.kwargs["pk"])
        self.form_image = PhotoDescriptionForm(instance=self.photo)
        self.avatar = self.photo.is_avatar(request.user)
        self.photos = self.user.get_photos_for_my_album(album_id=self.album.pk)
        self.template_name = self.user.get_permission_list_user(folder="album_photo_user/", template="photo.html", request=request)
        self.next = self.photos.filter(pk__gt=self.photo.pk).order_by('pk').first()
        self.prev = self.photos.filter(pk__lt=self.photo.pk).order_by('-pk').first()
        return super(UserAlbumPhoto,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(UserAlbumPhoto,self).get_context_data(**kwargs)
        context["object"]=self.photo
        context["album"]=self.album
        context["user"]=self.user
        context["next"]=self.next
        context["prev"]=self.prev
        context["avatar"]=self.avatar
        context["form_image"]=self.form_image
        return context


class UserCommentPhoto(TemplateView):
    """
    страница отдельного фото комментария к записям пользователя с разрещениями и без
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.user=User.objects.get(pk=self.kwargs["pk"])
        self.photo = Photo.objects.get(pk=self.kwargs["pk"])
        self.form_image = PhotoDescriptionForm(request.POST,instance=self.photo)
        self.template_name = self.user.get_permission_list_user(folder="photo_user/", template="photo.html", request=request)
        return super(UserCommentPhoto,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(UserCommentPhoto,self).get_context_data(**kwargs)
        context["object"]=self.photo
        context["user_form"]=PhotoDescriptionForm()
        return context


class UserDetailAvatar(TemplateView):
    """
    страница отдельного фото аватаров (альбом "Фото со страницы") пользователя с разрещениями и без
    """
    template_name = None

    def get(self,request,*args,**kwargs):
        self.user = User.objects.get(uuid=self.kwargs["uuid"])
        self.photo = Photo.objects.get(pk=self.kwargs["pk"])
        self.form_image = PhotoDescriptionForm(request.POST,instance=self.photo)
        self.avatar_photos = self.user.get_avatar_photos()
        self.template_name = self.user.get_permission_list_user(folder="photo_user/", template="photo.html", request=request)
        self.next = self.avatar_photos.filter(pk__gt=self.photo.pk).order_by('pk').first()
        self.prev = self.avatar_photos.filter(pk__lt=self.photo.pk).order_by('-pk').first()
        return super(UserDetailAvatar,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(UserDetailAvatar,self).get_context_data(**kwargs)
        context["object"] = self.photo
        context["user"] = self.user
        context["next"] = self.next
        context["prev"] = self.prev
        context["user_form"]=PhotoDescriptionForm()
        return context

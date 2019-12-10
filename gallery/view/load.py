from django.views.generic.base import TemplateView
from users.models import User
from main.models import ItemComment
from gallery.models import Album, Photo
from django.http import HttpResponse, HttpResponseBadRequest
from common.checkers import check_is_not_blocked_with_user_with_id, check_is_connected_with_user_with_id
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response
from rest_framework.exceptions import PermissionDenied


class UserPhoto(TemplateView):
    template_name="photo_user/photo.html"

    def get(self,request,*args,**kwargs):
        self.user=User.objects.get(uuid=self.kwargs["uuid"])
        self.photo = Photo.objects.get(pk=self.kwargs["pk"])
        self.avatar_album = Album.objects.get(creator=self.user, title="Фото со страницы", is_generic=True, community=None)
        try:
            self._avatar = Photo.objects.filter(album_2=self.avatar_album).order_by('-id')[0]
            if self._avatar.id == self.photo.id:
                self.avatar = True
            else:
                self.avatar = None
        except:
            self.avatar = None
        if self.user != request.user and request.user.is_authenticated:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
            if self.user.is_closed_profile:
                check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
            self.photos = self.user.get_photos()
        elif self.user == request.user and request.user.is_authenticated:
            self.photos = self.user.get_photos()
        elif self.user.is_closed_profile() and request.user.is_anonymous:
            raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')
        elif not self.user.is_closed_profile() and request.user.is_anonymous:
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
        context["avatar"]=self.avatar
        return context


class UserCommentPhoto(TemplateView):
    template_name="photo_user/comment_image.html"

    def get(self,request,*args,**kwargs):
        self.user=User.objects.get(uuid=self.kwargs["uuid"])
        self.comment = ItemComment.objects.get(pk=self.kwargs["pk"])
        try:
            self.image1 = self.comment.item_comment_photo
        except:
            self.image1 = None
        try:
            self.image2 = self.comment.item_comment_photo2
        except:
            self.image2 = None

        if self.user != request.user and request.user.is_authenticated:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
            if self.user.is_closed_profile:
                check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
            self.photo_1 = self.image1
            self.photo_2 = self.image2
        elif self.user == request.user and request.user.is_authenticated:
            self.photo_1 = self.image1
            self.photo_2 = self.image2
        elif self.user.is_closed_profile() and request.user.is_anonymous:
            raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')
        elif not self.user.is_closed_profile() and request.user.is_anonymous:
            self.photo_1 = self.image1
            self.photo_2 = self.image2
        return super(UserCommentPhoto,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(UserCommentPhoto,self).get_context_data(**kwargs)
        context["photo_1"]=self.photo_1
        context["photo_2"]=self.photo_2
        context["comment"]=self.comment
        return context


class UserDetailAvatar(TemplateView):
    template_name="photo_user/photo.html"

    def get(self,request,*args,**kwargs):
        self.user = User.objects.get(uuid=self.kwargs["uuid"])
        self.photo = Photo.objects.get(pk=self.kwargs["pk"])
        if self.user != request.user and request.user.is_authenticated:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.user.id)
            if self.user.is_closed_profile:
                check_is_connected_with_user_with_id(user=request.user, user_id=self.user.id)
            self.avatar_photos = self.user.get_avatar_photos()
        elif self.user == request.user and request.user.is_authenticated:
            self.avatar_photos = self.user.get_avatar_photos()
        elif self.user.is_closed_profile() and request.user.is_anonymous:
            raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')
        elif not self.user.is_closed_profile() and request.user.is_anonymous:
            self.avatar_photos = self.user.get_avatar_photos()
        self.next = self.avatar_photos.filter(pk__gt=self.photo.pk).order_by('pk').first()
        self.prev = self.avatar_photos.filter(pk__lt=self.photo.pk).order_by('-pk').first()
        return super(UserDetailAvatar,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(UserDetailAvatar,self).get_context_data(**kwargs)
        context["object"] = self.photo
        context["user"] = self.user
        context["next"] = self.next
        context["prev"] = self.prev
        return context

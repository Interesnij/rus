from django.views import View
from users.models import User
from django.http import HttpResponse, HttpResponseBadRequest
from common.staff_progs.photo import *
from gallery.models import Photo, PhotoComment
from managers.forms import PhotoModeratedForm, PhotoCommentModeratedForm
from django.views.generic.base import TemplateView
from managers.model.photo import ModeratedPhoto, ModeratedPhotoComment
from django.http import Http404
from common.template.user import get_detect_platform_template


class PhotoAdminCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser or request.user.is_work_photo_administrator:
            add_photo_administrator(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoAdminDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser and request.user.is_work_photo_administrator:
            remove_photo_administrator(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoModerCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser and request.user.is_work_photo_moderator:
            add_photo_moderator(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoModerDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser and request.user.is_work_photo_moderator:
            remove_photo_moderator(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoEditorCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser and request.user.is_work_photo_editor:
            add_photo_editor(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoEditorDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser and request.user.is_work_photo_editor:
            remove_photo_editor(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoWorkerAdminCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            add_photo_administrator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoWorkerAdminDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            remove_photo_administrator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoWorkerModerCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            add_photo_moderator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoWorkerModerDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            remove_photo_moderator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoWorkerEditorCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            add_photo_editor_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoWorkerEditorDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            remove_photo_editor_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class PhotoDeleteCreate(View):
    def post(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        form = PhotoModeratedForm(request.POST)
        if request.is_ajax() and form.is_valid() and (request.user.is_photo_manager or request.user.is_superuser):
            mod = form.save(commit=False)
            moderate_obj = ModeratedPhoto.get_or_create_moderated_object_for_photo(photo)
            moderate_obj.status = ModeratedPhoto.STATUS_DELETED
            moderate_obj.description = mod.description
            moderate_obj.save()
            moderate_obj.create_deleted(manager_id=request.user.pk, photo_id=photo.pk)
            photo.is_deleted = True
            photo.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class PhotoDeleteDelete(View):
    def get(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_photo_manager or request.user.is_superuser:
            moderate_obj = ModeratedPhoto.objects.get(photo=photo)
            moderate_obj.delete_deleted(manager_id=request.user.pk, photo_id=photo.pk)
            photo.is_deleted = False
            photo.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PhotoClaimCreate(View):
    def post(self,request,*args,**kwargs):
        from managers.model.photo import PhotoModerationReport

        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax():
            description = request.POST.get('description')
            type = request.POST.get('type')
            PhotoModerationReport.create_photo_moderation_report(reporter_id=request.user.pk, photo=photo, description=description, type=type)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class PhotoRejectedCreate(View):
    def get(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_photo_manager or request.user.is_superuser:
            moderate_obj = ModeratedPhoto.objects.get(post=post)
            moderate_obj.reject_moderation(manager_id=request.user.pk, photo_id=photo.pk)
            return HttpResponse()
        else:
            raise Http404

class PhotoUnverify(View):
    def get(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["photo_uuid"])
        obj = ModeratedPhoto.objects.get(pk=self.kwargs["obj_pk"])
        if request.is_ajax() and request.user.is_photo_manager or request.user.is_superuser:
            obj.unverify_moderation(manager_id=request.user.pk, photo_id=photo.pk)
            return HttpResponse()
        else:
            raise Http404

class CommentPhotoUnverify(View):
    def get(self,request,*args,**kwargs):
        comment = PhotoComment.objects.get(pk=self.kwargs["pk"])
        obj = ModeratedPhotoComment.objects.get(pk=self.kwargs["obj_pk"])
        if request.is_ajax() and request.user.is_photo_manager or request.user.is_superuser:
            obj.unverify_moderation(manager_id=request.user.pk, comment_id=comment.pk)
            return HttpResponse()
        else:
            raise Http404

class CommentPhotoDeleteCreate(View):
    def post(self,request,*args,**kwargs):
        comment = PhotoComment.objects.get(pk=self.kwargs["pk"])
        form = PhotoCommentModeratedForm(request.POST)
        if request.is_ajax() and form.is_valid() and (request.user.is_photo_manager or request.user.is_superuser):
            mod = form.save(commit=False)
            moderate_obj = ModeratedPhotoComment.get_or_create_moderated_object_for_comment(comment)
            moderate_obj.status = ModeratedPhotoComment.STATUS_DELETED
            moderate_obj.description = mod.description
            moderate_obj.save()
            moderate_obj.create_deleted(manager_id=request.user.pk, comment_id=comment.pk)
            comment.is_deleted = True
            comment.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CommentPhotoDeleteDelete(View):
    def get(self,request,*args,**kwargs):
        comment = PhotoComment.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_photo_manager or request.user.is_superuser:
            moderate_obj = ModeratedPhotoComment.objects.get(comment=comment)
            moderate_obj.delete_deleted(manager_id=request.user.pk, comment_id=comment.pk)
            comment.is_deleted = False
            comment.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class CommentPhotoClaimCreate(View):
    def post(self,request,*args,**kwargs):
        from managers.model.photo import PhotoCommentModerationReport

        comment = PhotoComment.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.is_ajax():
            description = request.POST.get('description')
            type = request.POST.get('type')
            PhotoCommentModerationReport.create_photo_comment_moderation_report(reporter_id=request.user.pk, comment=comment, description=description, type=type)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CommentPhotoRejectedCreate(View):
    def get(self,request,*args,**kwargs):
        comment = PhotoComment.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_photo_manager or request.user.is_superuser:
            moderate_obj = ModeratedPhotoComment.objects.get(comment=comment)
            moderate_obj.reject_moderation(manager_id=request.user.pk, comment_id=comment.pk)
            return HttpResponse()
        else:
            raise Http404

class PhotoDeleteWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.user.is_photo_manager or request.user.is_superuser:
            self.template_name = get_detect_platform_template("managers/manage_create/photo/photo_delete", request.user, request.META['HTTP_USER_AGENT'])
        else:
            raise Http404
        return super(PhotoDeleteWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(PhotoDeleteWindow,self).get_context_data(**kwargs)
        context["object"] = self.photo
        return context

class PhotoClaimWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        self.template_name = get_detect_platform_template("managers/manage_create/photo/photo_claim", request.user, request.META['HTTP_USER_AGENT'])
        return super(PhotoClaimWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(PhotoClaimWindow,self).get_context_data(**kwargs)
        context["object"] = self.photo
        return context


class PhotoCommentDeleteWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.comment = PhotoComment.objects.get(pk=self.kwargs["pk"])
        if request.user.is_photo_manager or request.user.is_superuser:
            self.template_name = get_detect_platform_template("managers/manage_create/photo/photo_comment_delete", request.user, request.META['HTTP_USER_AGENT'])
        else:
            raise Http404
        return super(PhotoCommentDeleteWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(PhotoCommentDeleteWindow,self).get_context_data(**kwargs)
        context["comment"] = self.comment
        return context

class PhotoCommentClaimWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.comment = PhotoComment.objects.get(pk=self.kwargs["pk"])
        try:
            self.photo = self.comment.parent_comment.photo
        except:
            self.photo = self.comment.photo
        self.template_name = get_detect_platform_template("managers/manage_create/photo/photo_comment_claim", request.user, request.META['HTTP_USER_AGENT'])
        return super(PhotoCommentClaimWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(PhotoCommentClaimWindow,self).get_context_data(**kwargs)
        context["comment"] = self.comment
        context["photo"] = self.photo
        return context

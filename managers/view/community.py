from django.views import View
from django.views.generic.base import TemplateView
from users.models import User
from communities.models import Community
from django.http import HttpResponse, HttpResponseBadRequest
from common.staff_progs.community import *
from managers.model.community import ModeratedCommunity
from managers.forms import CommunityModeratedForm, CommunityReportForm
from django.http import Http404
from common.template.user import get_detect_platform_template


class CommunityAdminCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_administrator()):
            add_community_administrator(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityAdminDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_administrator()):
            remove_community_administrator(user, request.user)
            UserWorkerLog.objects.create(manager=request.user, user=user, action_type='Удален админ пользователей')
            return HttpResponse()
        else:
            raise Http404

class CommunityModerCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_moderator()):
            add_community_moderator(user, request.user)
            UserWorkerLog.objects.create(manager=request.user, user=user, action_type='Добавлен модератор пользователей')
            return HttpResponse()
        else:
            raise Http404

class CommunityModerDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_moderator()):
            remove_community_moderator(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityEditorCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_editor()):
            add_community_editor(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityEditorDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_editor()):
            remove_community_editor(user, request.user)
            UserWorkerLog.objects.create(manager=request.user, user=user, action_type='Удален редактор пользователей')
            return HttpResponse()
        else:
            raise Http404


class CommunityAdvertiserCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_advertiser()):
            add_community_advertiser(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityAdvertiserDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_superuser or request.user.is_work_community_advertiser()):
            remove_community_advertiser(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerAdminCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            add_community_administrator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerAdminDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            remove_community_administrator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerModerCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            add_community_moderator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerModerDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            remove_community_moderator_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerEditorCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            add_community_editor_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerEditorDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            remove_community_editor_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerAdvertiserCreate(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            add_community_advertiser_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunityWorkerAdvertiserDelete(View):
    def get(self,request,*args,**kwargs):
        user = User.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_superuser:
            remove_community_advertiser_worker(user, request.user)
            return HttpResponse()
        else:
            raise Http404

class CommunitySuspensionCreate(View):
    def post(self,request,*args,**kwargs):
        form, community = CommunityModeratedForm(request.POST), Community.objects.get(pk=self.kwargs["pk"])

        if request.is_ajax() and form.is_valid() and (request.user.is_community_manager() or request.user.is_superuser):
            mod = form.save(commit=False)
            number = request.POST.get('number')
            moderate_obj = ModeratedCommunity.get_or_create_moderated_object_for_community(community)
            moderate_obj.status = ModeratedCommunity.STATUS_SUSPEND
            moderate_obj.description = mod.description
            moderate_obj.save()
            moderate_obj.create_suspend(manager_id=request.user.pk, community_id=community.pk, severity_int=number)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CommunitySuspensionDelete(View):
    def get(self,request,*args,**kwargs):
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_community_manager() or request.user.is_superuser:
            moderate_obj = ModeratedCommunity.objects.get(community=community)
            moderate_obj.delete_suspend(manager_id=request.user.pk, community_id=community.pk)
            return HttpResponse()
        else:
            raise Http404

class CommunityBlockCreate(View):
    def post(self,request,*args,**kwargs):
        community, form = Community.objects.get(pk=self.kwargs["pk"]), CommunityModeratedForm(request.POST)
        if request.is_ajax() and form.is_valid() and (request.user.is_community_manager() or request.user.is_superuser):
            mod = form.save(commit=False)
            moderate_obj = ModeratedCommunity.get_or_create_moderated_object_for_community(community)
            moderate_obj.status = ModeratedCommunity.STATUS_BLOCKED
            moderate_obj.description = mod.description
            moderate_obj.save()
            moderate_obj.create_block(manager_id=request.user.pk, community_id=community.pk)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CommunityBlockDelete(View):
    def get(self,request,*args,**kwargs):
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_community_manager() or request.user.is_superuser):
            moderate_obj = ModeratedCommunity.objects.get(community_id=self.kwargs["pk"])
            moderate_obj.delete_block(manager_id=request.user.pk, community_id=community.pk)
            return HttpResponse()
        else:
            raise Http404

class CommunityWarningBannerCreate(View):
    def post(self,request,*args,**kwargs):
        community, form = Community.objects.get(pk=self.kwargs["pk"]), CommunityModeratedForm(request.POST)
        if request.is_ajax() and form.is_valid() and (request.user.is_community_manager() or request.user.is_superuser):
            mod = form.save(commit=False)
            moderate_obj = ModeratedCommunity.get_or_create_moderated_object_for_community(community)
            moderate_obj.status = ModeratedCommunity.STATUS_BANNER_GET
            moderate_obj.description = mod.description
            moderate_obj.save()
            moderate_obj.create_warning_banner(manager_id=request.user.pk, community_id=community.pk)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CommunityClaimCreate(View):
    def post(self,request,*args,**kwargs):
        from managers.model.community import CommunityModerationReport

        community, form = Community.objects.get(pk=self.kwargs["pk"]), CommunityReportForm(request.POST)
        if request.is_ajax() and form.is_valid() and request.user.is_authenticated:
            mod = form.save(commit=False)
            CommunityModerationReport.create_community_moderation_report(reporter_id=request.user.pk, community=community, description=mod.description, type=request.POST.get('type'))
            return HttpResponse()
        else:
            return HttpResponseBadRequest()

class CommunityWarningBannerDelete(View):
    def get(self,request,*args,**kwargs):
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_community_manager() or request.user.is_superuser):
            moderate_obj = ModeratedCommunity.objects.get(community=community)
            moderate_obj.delete_warning_banner(manager_id=request.user.pk, community_id=community.pk)
            return HttpResponse()
        else:
            raise Http404

class CommunityRejectedCreate(View):
    def get(self,request,*args,**kwargs):
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and (request.user.is_community_manager() or request.user.is_superuser):
            moderate_obj = ModeratedCommunity.objects.get(community=community)
            moderate_obj.reject_moderation(manager_id=request.user.pk, community_id=community.pk)
            return HttpResponse()
        else:
            raise Http404


class CommunitySuspendWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        if request.user.is_community_manager() or request.user.is_superuser:
            self.template_name = get_detect_platform_template("managers/manage_create/community_suspend.html", request.user, request.META['HTTP_USER_AGENT'])
        else:
            raise Http404
        return super(CommunitySuspendWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunitySuspendWindow,self).get_context_data(**kwargs)
        context["community"] = self.community
        return context

class CommunityBlockWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        if request.user.is_community_manager() or request.user.is_superuser:
            self.template_name = get_detect_platform_template("managers/manage_create/community_block.html", request.user, request.META['HTTP_USER_AGENT'])
        else:
            raise Http404
        return super(CommunityBlockWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunityBlockWindow,self).get_context_data(**kwargs)
        context["community"] = self.community
        return context

class CommunityWarningBannerdWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        if request.user.is_community_manager() or request.user.is_superuser:
            self.template_name = get_detect_platform_template("managers/manage_create/community_warning_banner.html", request.user, request.META['HTTP_USER_AGENT'])
        else:
            raise Http404
        return super(CommunityWarningBannerdWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunityWarningBannerdWindow,self).get_context_data(**kwargs)
        context["community"] = self.community
        return context

class CommunityClaimWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community, self.template_name = Community.objects.get(pk=self.kwargs["pk"]), get_detect_platform_template("managers/manage_create/community_claim.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(CommunityClaimWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(CommunityClaimWindow,self).get_context_data(**kwargs)
        context["community"] = self.community
        return context

class CommunityUnverify(View):
    def get(self,request,*args,**kwargs):
        obj = ModeratedCommunity.objects.get(pk=self.kwargs["obj_pk"])
        if request.is_ajax() and (request.user.is_community_manager() or request.user.is_superuser):
            obj.unverify_moderation(manager_id=request.user.pk, community_id=self.kwargs["community_pk"])
            return HttpResponse()
        else:
            raise Http404

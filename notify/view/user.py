from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import ListView
from notify.model.user import UserNotify, UserCommunityNotify
from common.template.user import get_settings_template


class UserNotificationListView(LoginRequiredMixin, ListView):
    model = UserNotify
    context_object_name = 'notification_list'
    template_name = None

    def get(self,request,*args,**kwargs):
        self.template_name = get_settings_template("notify/user/user_notify_list.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(UserNotificationListView,self).get(request,*args,**kwargs)

    def get_queryset(self, **kwargs):
        notify = UserNotify.objects.filter(recipient=self.request.user)
        return notify


class CommunityNotificationListView(LoginRequiredMixin, ListView):
    model = UserCommunityNotify
    context_object_name = 'notification_list'
    template_name = None

    def get(self,request,*args,**kwargs):
        self.template_name = get_settings_template("notify/user/community_notify_list.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(CommunityNotificationListView,self).get(request,*args,**kwargs)

    def get_queryset(self, **kwargs):
        notify = UserCommunityNotify.objects.filter(community__creator=self.request.user)
        return notify


@login_required
def user_all_read(request):
    request.user.user_notifications.mark_all_as_read()
    _next = request.GET.get('next')
    if _next:
        return redirect(_next)
    return redirect('user_all_read')

@login_required
def community_all_read(request):
    request.user.community_notifications.mark_all_as_read()
    _next = request.GET.get('next')
    if _next:
        return redirect(_next)
    return redirect('community_all_read')


class UserLastNotify(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.template_name = get_settings_template("notify/user/u_most_recent.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(UserLastNotify,self).get(request,*args,**kwargs)

    def get_queryset(self):
        notifications = self.request.user.user_notifications.get_most_recent()
        return notifications

class CommunityLastNotify(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.template_name = get_settings_template("notify/user/c_most_recent.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(CommunityLastNotify,self).get(request,*args,**kwargs)

    def get_queryset(self):
        notifications = self.request.user.user_notifications.get_most_recent()
        return notifications

from django.conf.urls import url
from notify.view.user import *


urlpatterns = [
    url(r'^u/$', UserNotificationListView.as_view(), name='user_notify_list'),
    url(r'^c/$', CommunityNotificationListView.as_view(), name='community_notify_list'),
    url(r'^u_last_notify/$', UserLastNotify.as_view()),
    url(r'^c_last_notify/$', CommunityLastNotify.as_view()),
]

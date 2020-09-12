from django.conf.urls import url
from video.view.user import *


urlpatterns = [
    url(r'^list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserVideoList.as_view()),
    url(r'^detail/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserVideoDetail.as_view(), name="video_detail"),
    url(r'^info/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserVideoInfo.as_view()),

    url(r'^create_list_window/(?P<pk>\d+)/$', UserCreateListWindow.as_view()),
    url(r'^create_video_attach_window/(?P<pk>\d+)/$', UserCreateVideoAttachWindow.as_view()),
    url(r'^create_video_window/(?P<pk>\d+)/$', UserCreateVideoWindow.as_view()),
]

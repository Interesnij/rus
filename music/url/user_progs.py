from django.conf.urls import url
from music.view.user_progs import *
from django.contrib.auth.decorators import login_required


urlpatterns = [
    url(r'^souncloud_create_list_window/(?P<pk>\d+)/$', UserSoundcloudSetPlaylistWindow.as_view()),
    url(r'^souncloud_list_window/(?P<pk>\d+)/$', UserSoundcloudSetWindow.as_view()),
    url(r'^create_list_window/(?P<pk>\d+)/$', UserCreatePlaylistWindow.as_view()),

    url(r'^create_soundcloud_set/(?P<pk>\d+)/$', UserSoundcloudSetCreate.as_view()),
    url(r'^soundcloud_set/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserSoundcloudSet.as_view()),

    url(r'^u_add_track/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', login_required(UserTrackAdd.as_view())),
    url(r'^u_remove_track/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', login_required(UserTrackRemove.as_view())),
    url(r'^u_add_track_in_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', login_required(UserTrackListAdd.as_view())),
    url(r'^u_remove_track_in_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', login_required(UserTrackListRemove.as_view())),
]

from django.conf.urls import url
from users.views.load import *
from django.contrib.auth.decorators import login_required


urlpatterns = [
    url(r'^profile_button/(?P<pk>\d+)/$', ProfileButtonReload.as_view(), name='profile_button_reload'),
    url(r'^profile_stat/(?P<pk>\d+)/$', ProfileStatReload.as_view(), name='profile_stat_reload'),
    url(r'^(?P<pk>\d+)/profile_reload/$', ProfileReload.as_view(), name='profile_reload'),
    url(r'^img_load/(?P<uuid>[0-9a-f-]+)/$', login_required(UserImagesLoad.as_view())),
    url(r'^playlist/(?P<uuid>[0-9a-f-]+)/$', UserPlaylistLoad.as_view()),
]

from django.conf.urls import url
from users.views.load import ProfileStatReload, ProfileButtonReload, AvatarReload, ProfileReload


urlpatterns = [
    url(r'^profile_button/(?P<pk>\d+)/$', ProfileButtonReload.as_view(), name='profile_button_reload'),
    url(r'^profile_stat/(?P<pk>\d+)/$', ProfileStatReload.as_view(), name='profile_stat_reload'),
    url(r'^avatar-reload/$', AvatarReload.as_view(), name='avatar_reload'),
    url(r'^(?P<pk>\d+)/profile_reload/$', ProfileReload.as_view(), name='profile_reload'),
]

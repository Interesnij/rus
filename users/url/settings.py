from django.conf.urls import url
from users.views.settings import (
                                    UserGeneralChange,
                                    UserAboutChange,
                                    SettingsNotifyView,
                                    SettingsPrivateView,
                                    UserDesign,
                                    StateCoverView,
                                )


urlpatterns = [
    url(r'^general/(?P<pk>[0-9]+)/$', UserGeneralChange.as_view(), name='user_general_form'),
    url(r'^about/(?P<pk>[0-9]+)/$', UserAboutChange.as_view(), name='user_about_form'),
    url(r'^design/(?P<pk>\d+)/$', UserDesign.as_view(), name='user_design'),
    url(r'^settings_notify/(?P<pk>[0-9]+)/$', SettingsNotifyView.as_view(), name='user_settings_notify'),
    url(r'^settings_private/(?P<pk>[0-9]+)/$', SettingsPrivateView.as_view(), name='user_settings_private'),

    url(r'^statistics/(?P<pk>[0-9]+)/$', StateCoverView.as_view(), name='user_stat_coverage'),
]

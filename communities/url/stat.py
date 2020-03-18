from django.conf.urls import url, include
from communities.views.stat import CommunityCoberturaMonth


urlpatterns = [
    url(r'^cuberture_month/(?P<pk>[0-9]+)/$', CommunityCoberturaMonth.as_view(), name='community_cuberture_month'),
    url(r'^cuberture_day/(?P<pk>[0-9]+)/$', CommunityCoberturaaDay.as_view(), name='community_cuberture_day'),
]

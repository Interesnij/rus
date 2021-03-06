from frends.views import *
from django.conf.urls import url


urlpatterns = [
    url(r'^(?P<pk>\d+)/$', FrendsListView.as_view(), name="frends"),
    url(r'^online/(?P<pk>\d+)/$', OnlineFrendsListView.as_view(), name="online_frends"),
    url(r'^common/(?P<pk>\d+)/$', CommonFrendsListView.as_view(), name="common_frends"),

    url(r'^add/(?P<pk>\d+)/$', ConnectCreate.as_view(), name="create_connect"),
    url(r'^delete/(?P<pk>\d+)/$', ConnectDelete.as_view(), name="delete_connect"),
]

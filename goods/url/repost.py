from goods.view.repost import *
from django.conf.urls import url

urlpatterns = [
# u_ucm_good - товар пользователя(u) к себе на стену(u), в сообщество (c) или в сообщения(m)
    url(r'^u_ucm_good_window/(?P<pk>\d+)/(?P<good_pk>\d+)/$', UUCMGoodWindow.as_view()),
    url(r'^c_ucm_good_window/(?P<pk>\d+)/(?P<good_pk>\d+)/$', CUCMGoodWindow.as_view()),

    url(r'^u_u_good_repost/(?P<pk>\d+)/(?P<good_pk>\d+)/$', UUGoodRepost.as_view()),
    url(r'^c_u_good_repost/(?P<pk>\d+)/(?P<good_pk>\d+)/$', CUGoodRepost.as_view()),
    url(r'^u_c_good_repost/(?P<pk>\d+)/(?P<good_pk>\d+)/$', UCGoodRepost.as_view()),
    url(r'^c_c_good_repost/(?P<pk>\d+)/(?P<good_pk>\d+)/$', CCGoodRepost.as_view()),
    url(r'^u_m_good_repost/(?P<pk>\d+)/(?P<good_pk>\d+)/$', UMGoodRepost.as_view()),
    url(r'^c_m_good_repost/(?P<pk>\d+)/(?P<good_pk>\d+)/$', CMGoodRepost.as_view()),
]

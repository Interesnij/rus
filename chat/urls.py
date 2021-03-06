from django.conf.urls import url, include
from chat.views import *


urlpatterns = [
    url(r'^$', MessagesListView.as_view(), name='messages_list'),
    url(r'^(?P<pk>\d+)/$', ChatDetailView.as_view(), name='chat_detail'),

    url(r'^user_progs/', include('chat.url.user_progs')),
	url(r'^chat_progs/', include('chat.url.chat_progs')),
    url(r'^member_progs/', include('chat.url.member_progs')),
]

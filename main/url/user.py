from django.conf.urls import url
from main.view.user import *
from django.contrib.auth.decorators import login_required


urlpatterns = [
	url(r'^comment/(?P<uuid>[0-9a-f-]+)/(?P<pk>\d+)/$', ItemUserCommentList.as_view()),
    url(r'^post-comment/(?P<uuid>[0-9a-f-]+)/(?P<pk>\d+)/$', login_required(ItemCommentUserCreate.as_view())),
    url(r'^reply-comment/(?P<uuid>[0-9a-f-]+)/(?P<pk>\d+)/$', login_required(ItemReplyUserCreate.as_view())),

	url(r'^fixed/(?P<pk>\d+)/(?P<user_uuid>[0-9a-f-]+)/$', login_required(user_fixed)),
    url(r'^unfixed/(?P<pk>\d+)/(?P<user_uuid>[0-9a-f-]+)/$', login_required(user_unfixed)),
    url(r'^delete/(?P<pk>\d+)/(?P<user_uuid>[0-9a-f-]+)/$', login_required(user_item_delete)),
]

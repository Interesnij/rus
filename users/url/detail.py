from django.conf.urls import url
from users.views.detail import *
from users.views.lists import *
from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'^item/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserItemView.as_view(), name='user_item'),
    url(r'^communities/(?P<uuid>[0-9a-f-]+)/$', UserCommunitiesList.as_view()),
    url(r'^visit_communities/(?P<pk>\d+)/$', UserVisitCommunities.as_view(), name='visit_communities'),
    url(r'^manage_communities/(?P<uuid>[0-9a-f-]+)/$', UserManageCommunitiesList.as_view()),
    url(r'^list/(?P<pk>\d+)/$', ItemListView.as_view()),
    url(r'^possible/(?P<pk>\d+)/$', login_required(AllPossibleUsersList.as_view()), name='possible_users'),
]

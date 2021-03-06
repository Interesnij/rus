from django.conf.urls import url
from communities.views.progs import *
from django.contrib.auth.decorators import login_required


urlpatterns = [
    url(r'^add_member/(?P<pk>\d+)/$', CommunityMemberCreate.as_view()),
    url(r'^delete_member/(?P<pk>\d+)/$', CommunityMemberDelete.as_view()),
    url(r'^manager_add_member/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityManageMemberCreate.as_view()),
    url(r'^manager_delete_member/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityManageMemberDelete.as_view()),

    url(r'^add/$', CommunityCreate.as_view(), name="add_community"),
    url(r'^cat/(?P<order>\d+)/$',CommunitiesCatsView.as_view(), name="communities_cats"),

    url(r'^add_admin/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityAdminCreate.as_view()),
    url(r'^delete_admin/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityAdminDelete.as_view()),
    url(r'^add_moderator/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityModerCreate.as_view()),
    url(r'^delete_moderator/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityModerDelete.as_view()),
    url(r'^add_editor/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityEditorCreate.as_view()),
    url(r'^delete_editor/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityEditorDelete.as_view()),
    url(r'^add_advertiser/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityAdvertiserCreate.as_view()),
    url(r'^delete_advertiser/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityAdvertiserDelete.as_view()),
]

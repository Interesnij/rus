from django.conf.urls import url
from video.view.community_progs import *


urlpatterns = [
    url(r'^create_video_attach/(?P<pk>\d+)/$', CommunityVideoAttachCreate.as_view()),
    url(r'^create_video/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityVideoCreate.as_view()),

    url(r'^delete/(?P<uuid>[0-9a-f-]+)/$', CommunityVideoDelete.as_view()),
    url(r'^abort_delete/(?P<uuid>[0-9a-f-]+)/$', CommunityVideoAbortDelete.as_view()),
    url(r'^on_comment/(?P<uuid>[0-9a-f-]+)/$', CommunityOpenCommentVideo.as_view()),
    url(r'^off_comment/(?P<uuid>[0-9a-f-]+)/$', CommunityCloseCommentVideo.as_view()),
    url(r'^on_private/(?P<uuid>[0-9a-f-]+)/$', CommunityOnPrivateVideo.as_view()),
    url(r'^off_private/(?P<uuid>[0-9a-f-]+)/$', CommunityOffPrivateVideo.as_view()),
    url(r'^on_votes/(?P<uuid>[0-9a-f-]+)/$', CommunityOnVotesVideo.as_view()),
    url(r'^off_votes/(?P<uuid>[0-9a-f-]+)/$', CommunityOffVotesVideo.as_view()),

    url(r'^post-comment/$', VideoCommentCommunityCreate.as_view()),
    url(r'^reply-comment/$', VideoReplyCommunityCreate.as_view()),
    url(r'^delete_comment/(?P<pk>\d+)/$', VideoCommentCommunityDelete.as_view()),
	url(r'^abort_delete_comment/(?P<pk>\d+)/$', VideoCommentCommunityAbortDelete.as_view()),
    url(r'^get_album_preview/(?P<pk>\d+)/$', CommunityVideoAlbumPreview.as_view()),

    url(r'^create_list/(?P<pk>\d+)/$', CommunityVideoListCreate.as_view()),
    url(r'^edit_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityVideolistEdit.as_view()),
    url(r'^delete_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityVideolistDelete.as_view()),
    url(r'^abort_delete_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityVideolistAbortDelete.as_view()),
    url(r'^add_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityVideoAlbumAdd.as_view()),
    url(r'^remove_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityVideoAlbumRemove.as_view()),
]

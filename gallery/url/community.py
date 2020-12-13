﻿from gallery.view.community import *
from django.conf.urls import url

urlpatterns=[
	url(r'^photos/(?P<pk>\d+)/$', CommunityPhotosList.as_view()),
	url(r'^album_photos/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityAlbumPhotosList.as_view(), name="community_photos"),

	url(r'^avatar_photo/(?P<pk>\d+)/(?P<photo_pk>\d+)/$', CommunityDetailAvatar.as_view(), name="community_avatar"),
    url(r'^photo/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityPhoto.as_view(), name="community_photo"),
    url(r'^album_photo/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', CommunityAlbumPhoto.as_view(), name="community_album_photo"),
    url(r'^wall_photo/(?P<pk>\d+)/(?P<photo_pk>\d+)/$', CommunityWallPhoto.as_view(), name="c_wall_photo"),
	url(r'^avatar/(?P<pk>\d+)/$', CommunityFirstAvatar.as_view()),
	url(r'^preview_photo/(?P<pk>\d+)/$', GetCommunityPhoto.as_view()),

	url(r'^comment/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', PhotoCommunityCommentList.as_view()),
]

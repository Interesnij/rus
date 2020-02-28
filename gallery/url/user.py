from gallery.view.user import *
from django.conf.urls import url


urlpatterns=[
	url(r'^(?P<pk>\d+)/$', UserGalleryView.as_view(), name="user_gallery"),
	url(r'^photos/(?P<uuid>[0-9a-f-]+)/$', UserPhotosList.as_view(), name="user_photos"),
	url(r'^album_photos/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserAlbumPhotosList.as_view(), name="user_photos"),
	url(r'^album/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserAlbumView.as_view(), name="user_album"),
	url(r'^add_photo/(?P<uuid>[0-9a-f-]+)/$', PhotoUserCreate.as_view(), name="photo_add_user"),
	url(r'^add_album_photo/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', PhotoAlbumUserCreate.as_view(), name="photo_album_add_user"),
	url(r'^add_album/(?P<uuid>[0-9a-f-]+)/$', AlbumUserCreate.as_view(), name="album_add_user"),
	url(r'^new_album/(?P<uuid>[0-9a-f-]+)/$', NewAlbomView.as_view(), name="album_ggg"),
	url(r'^album/reload/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserAlbomReload.as_view(), name="user_album_reload"),

	url(r'^add_avatar/(?P<pk>\d+)/$', UserAddAvatar.as_view(), name='user_add_avatar'),
	url(r'^avatar-reload/(?P<pk>\d+)/$', AvatarReload.as_view(), name='avatar_reload'),
]

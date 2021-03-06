from django.conf.urls import url, include


urlpatterns=[
	url(r'^user/', include('gallery.url.user')),
	url(r'^community/', include('gallery.url.community')),

	url(r'^user_progs/', include('gallery.url.user_progs')),
	url(r'^community_progs/', include('gallery.url.community_progs')),

	url(r'^votes/', include('gallery.url.votes')),
	url(r'^window/', include('gallery.url.window')),
	url(r'^repost/', include('gallery.url.repost')),
]

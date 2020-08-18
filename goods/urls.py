from django.conf.urls import url, include


urlpatterns=[
	url(r'^user/', include('goods.url.user')),
	url(r'^community/', include('goods.url.community')),

	url(r'^progs/', include('goods.url.progs')),
	url(r'^user_progs/', include('goods.url.user_progs')),
	url(r'^community_progs/', include('goods.url.community_progs')),

	url(r'^votes/', include('goods.url.votes')),
	url(r'^window/', include('goods.url.window')),

	url(r'^repost/', include('goods.url.repost')),
]

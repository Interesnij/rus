from .views import GoodCategoriesEdit, GoodSubCategoriesEdit, GoodsListView
from django.conf.urls import url

urlpatterns=[
	url(r'^$', GoodsListView.as_view(), name="goods"),
    url(r'sub/^$', GoodSubCategoriesView.as_view(), name="good_sub_categories"),
    url(r'cat/^$', GoodCategoriesView.as_view(), name="good_categories"),
]

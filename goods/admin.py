from django.contrib import admin
from goods.models import Good, GoodAlbum, GoodSubCategory, GoodCategory


class GoodCategoryAdmin(admin.ModelAdmin):
    list_display = ['name','order','image']
    search_fields = ['name']
    class Meta:
            model = GoodCategory


class GoodSubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'image', 'category']
    search_fields = ['name']
    class Meta:
            model = GoodSubCategory

class GoodAlbumAdmin(admin.ModelAdmin):
    list_display = ['title', 'order',]
    search_fields = ['name']
    class Meta:
            model = GoodAlbum

class GoodAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'description', 'sub_category']
    search_fields = ['name']
    class Meta:
            model = Good


admin.site.register(GoodCategory, GoodCategoryAdmin)
admin.site.register(GoodSubCategory, GoodSubCategoryAdmin)
admin.site.register(Good, GoodAdmin)

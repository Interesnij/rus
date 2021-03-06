from django.contrib import admin
from notify.model.user import UserNotify, UserCommunityNotify
from notify.model.post import PostNotify, PostCommunityNotify
from notify.model.photo import PhotoNotify, PhotoCommunityNotify
from notify.model.good import GoodNotify, GoodCommunityNotify
from notify.model.video import VideoNotify, VideoCommunityNotify
from notify.model.survey import SurveyNotify, SurveyCommunityNotify


class PostNotifyAdmin(admin.ModelAdmin):
    list_display = ['creator','recipient','created']
    list_filter = ['created']
    class Meta:
        model = PostNotify

admin.site.register(UserNotify)
admin.site.register(UserCommunityNotify)
admin.site.register(PostNotify, PostNotifyAdmin)
admin.site.register(PostCommunityNotify)
admin.site.register(PhotoNotify)
admin.site.register(PhotoCommunityNotify)
admin.site.register(GoodNotify)
admin.site.register(GoodCommunityNotify)
admin.site.register(VideoNotify)
admin.site.register(VideoCommunityNotify)
admin.site.register(SurveyNotify)
admin.site.register(SurveyCommunityNotify)

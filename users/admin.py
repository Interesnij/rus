from django.contrib import admin
from users.models import *


class UserProfileInline(admin.TabularInline):
    model = UserProfile

class UserNotificationsSettingsInline(admin.TabularInline):
    model = UserNotificationsSettings

class UserPrivateSettingsInline(admin.TabularInline):
    model = UserPrivateSettings

class UserAdmin(admin.ModelAdmin):
    inlines = [
        UserProfileInline,
        UserNotificationsSettingsInline,
        UserPrivateSettingsInline,
    ]
    search_fields = ('last_name','first_name')



admin.site.register(User, UserAdmin)

admin.site.register(UserBlock)

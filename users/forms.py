from django import forms
from django.http import Http404
from django.contrib.auth.models import User
from .models import UserProfile
from django import forms
from cropper_widget.widgets import CropperWidget


class GeneralUserForm(forms.ModelForm):
    first_name = forms.CharField(required=False,max_length=256,label='Имя')
    last_name = forms.CharField(required=False,max_length=256,label='Фамилия')

    class Meta:
        model = UserProfile
        fields = (
        'first_name',
        'last_name',
        'sity',
        'vk_url',
        'youtube_url',
        'facebook_url',
        'instagram_url',
        'twitter_url',
        'phone',
        )


class AboutUserForm(forms.ModelForm):

    class Meta:
        model = UserProfile
        fields = (
        'bio',
        )

class AvatarUserForm(forms.ModelForm):
    avatar = forms.ImageField(widget=CropperWidget(cropper_options={'aspectRatio': 1}))

    class Meta:
        model = UserProfile
        fields = (
        'avatar',
        )

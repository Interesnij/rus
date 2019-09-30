from posts.models import Post,PostComment
from django import forms


class PostHardForm(forms.ModelForm):

	class Meta:
		model = Post
		fields = ['content_hard']

class PostMediumForm(forms.ModelForm):

	class Meta:
		model = Post
		fields = ['content_medium']

class PostLiteForm(forms.ModelForm):

	class Meta:
		model = Post
		fields = ['content_lite']

class PostLiteForm(forms.ModelForm):

	class Meta:
		model = PostComment
		fields = ['text']

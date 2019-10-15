from article.models import Article,ArticleComment
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class ArticleForm(forms.ModelForm):
	content = forms.CharField( label="",widget=CKEditorUploadingWidget(
            attrs={'placeholder': 'Пишите здесь Ваши мысли и перетаскивайте сюда фотографии'}
        ))

	class Meta:
		model = Article
		fields = ['content']

class ArticleCommentForm(forms.ModelForm):

	class Meta:
		model = ArticleComment
		fields = ['text']

class ArticleRepostForm(forms.Form):
    repost_comment = forms.CharField(widget=forms.Textarea)

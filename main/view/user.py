from django.views.generic.base import TemplateView
from django.views.generic import ListView
from users.models import User
from main.models import Item, ItemComment
from django.http import HttpResponse, HttpResponseBadRequest
from main.forms import CommentForm
from django.template.loader import render_to_string
from django.views import View
from common.checkers import check_is_not_blocked_with_user_with_id, check_is_connected_with_user_with_id
from rest_framework.exceptions import PermissionDenied, ValidationError
from gallery.models import Album, Photo


class ItemUserCommentList(ListView):
    template_name = None
    model = ItemComment
    paginate_by = 30

    def get(self,request,*args,**kwargs):
        self.item = Item.objects.get(uuid=self.kwargs["uuid"])
        self.user = User.objects.get(pk=self.kwargs["pk"])
        self.template_name = self.community.get_template_list(folder="u_item_comment/", template="comments.html", request=request)
        return super(ItemUserCommentList,self).get(request,*args,**kwargs)

    def get_context_data(self, **kwargs):
        context = super(ItemUserCommentList, self).get_context_data(**kwargs)
        context['parent'] = self.item
        context['form_comment'] = CommentForm()
        context['form_reply'] = CommentForm()
        context['user'] = self.user
        return context

    def get_queryset(self):
        comments = self.item.get_comments()
        return comments


class ItemCommentUserCreate(View):
	form_post = None
	def post(self,request,*args,**kwargs):
		form_post = CommentForm(request.POST, request.FILES)
		user = User.objects.get(pk=request.POST.get('id'))
		item_uuid = request.POST.get('item')
		item = Item.objects.get(uuid=item_uuid)
		if form_post.is_valid():
			comment=form_post.save(commit=False)
			photo=form_post.cleaned_data['photo']
			photo2=form_post.cleaned_data['photo2']

			if not comment.text and not photo and not photo2:
				raise ValidationError('Напишите что-нибудь или прикрепите изображение')
			if request.user.pk != user.pk:
				check_is_not_blocked_with_user_with_id(user=request.user, user_id = user.pk)
				if user.is_closed_profile():
					check_is_connected_with_user_with_id(user=request.user, user_id = user.pk)
			new_comment = comment.create_comment(commenter=request.user, parent_comment=None, item=item, text=comment.text)
			if photo:
				try:
					album=Album.objects.get(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				except:
					album=Album.objects.create(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				upload_photo = Photo.objects.create(creator=request.user, file=photo,community=None,is_public=True, album=album)
				upload_photo.item_comment.add(new_comment)
			if photo2:
				try:
					album=Album.objects.get(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				except:
					album=Album.objects.create(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				upload_photo2 = Photo.objects.create(creator=request.user, file=photo2,community=None,is_public=True, album=album)
				upload_photo2.item_comment.add(new_comment)
			new_comment.notification_user_comment(request.user)
			html = render_to_string('item_user/parent_comment.html',{'comment': new_comment, 'request_user': request.user, "form_reply": CommentForm(), 'request': request})
			return JsonResponse(html, safe=False)
		else:
			return HttpResponseBadRequest()


class ItemReplyUserCreate(View):
	def post(self,request,*args,**kwargs):
		form_post=CommentForm(request.POST, request.FILES)
		user=User.objects.get(uuid=self.kwargs["uuid"])
		parent = ItemComment.objects.get(pk=self.kwargs["pk"])

		if form_post.is_valid():
			comment=form_post.save(commit=False)
			photo=form_post.cleaned_data['photo']
			photo2=form_post.cleaned_data['photo2']
			if not comment.text and not photo and not photo2:
				raise ValidationError('Для добавления комментария необходимо написать что-то или прикрепить изображение')
			if request.user != user:
				check_is_not_blocked_with_user_with_id(user=request.user, user_id = user.id)
				if user.is_closed_profile():
					check_is_connected_with_user_with_id(user=request.user, user_id = user.id)

			new_comment = comment.create_comment(commenter=request.user, text=comment.text, parent_comment=parent)
			if photo:
				try:
					album=Album.objects.get(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				except:
					album=Album.objects.create(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				upload_photo = Photo.objects.create(creator=request.user, file=photo, community=None, album=album)
				upload_photo.item_comment.add(new_comment)
			if photo2:
				try:
					album=Album.objects.get(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				except:
					album=Album.objects.create(creator=request.user, title="Сохраненные фото", is_generic=True, community=None)
				upload_photo2 = Photo.objects.create(creator=request.user, file=photo2, community=None, album=album)
				upload_photo2.item_comment.add(new_comment)
			new_comment.notification_user_reply_comment(request.user)
			html = render_to_string('item_user/reply_comment.html',{'reply': new_comment, 'comment': parent, 'user': user, 'request_user': request.user, "form_reply": CommentForm(), 'request': request})
			return JsonResponse(html, safe=False)
		else:
			return HttpResponseBadRequest()


def post_update_interactions(request):
    data_point = request.POST['id_value']
    item = Item.objects.get(uuid=data_point)
    data = {'likes': item.count_likers(), 'dislikes': item.count_dislikers(), 'comments': item.count_thread()}
    return JsonResponse(data)


def user_fixed(request, uuid):
	item = Item.objects.get(uuid=uuid)
	if request.user == item.creator:
		item.get_fixed_for_user(request.user.pk)
		return HttpResponse("!")
	else:
		return HttpResponse("Закрепляйте, пожалуйста, свои записи!")

def user_unfixed(request, uuid):
	item = Item.objects.get(uuid=uuid)
	if request.user == item.creator:
		item.is_fixed=False
		item.save(update_fields=['is_fixed'])
		return HttpResponse("!")
	else:
		return HttpResponse("Открепляйте, пожалуйста, свои записи!")


def user_off_comment(request, uuid):
	item = Item.objects.get(uuid=uuid)
	if request.user == item.creator:
		item.comments_enabled=False
		item.save(update_fields=['comments_enabled'])
		return HttpResponse("!")
	else:
		return HttpResponse("Пожалуйста, отключайте комментарии к своим записям!")

def user_on_comment(request, uuid):
	item = Item.objects.get(uuid=uuid)
	if request.user == item.creator:
		item.comments_enabled=True
		item.save(update_fields=['comments_enabled'])
		return HttpResponse("!")
	else:
		return HttpResponse("Пожалуйста, включайте комментарии к своим записям!")

def user_item_delete(request, uuid):
	item = Item.objects.get(uuid=uuid)
	if request.user == item.creator:
		item.is_deleted=True
		item.save(update_fields=['is_deleted'])
		return HttpResponse("!")
	else:
		return HttpResponse("Удаляйте, пожалуйста, свои записи!")


class ItemUserDetail(TemplateView):
	template_name = "item_user/detail.html"

	def get(self,request,*args,**kwargs):
		self.item = Item.objects.get(uuid=self.kwargs["uuid"])
		if self.item.creator != request.user and request.user.is_authenticated:
			check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.item.creator_id)
			if self.item.creator.is_closed_profile():
				check_is_connected_with_user_with_id(user=request.user, user_id=self.item.creator_id)
			self.object = self.item
		elif self.item.creator == request.user:
			self.object = self.item
		elif request.user.is_anonymous and self.item.creator.is_closed_profile():
			raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')
		elif request.user.is_anonymous and not self.item.creator.is_closed_profile():
			self.object = self.item
		return super(ItemUserDetail,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(ItemUserDetail,self).get_context_data(**kwargs)
		context["object"]=self.object
		return context

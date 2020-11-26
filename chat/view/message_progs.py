from django.views.generic.base import TemplateView
from django.views import View
from django.http import HttpResponse, HttpResponseBadRequest
from chat.forms import ChatForm, MessageForm
from chat.models import Chat, Message, MessageFavorite
from users.models import User
from django.http import Http404
from common.check.user import check_user_can_get_list
from common.attach.message_attacher import get_message_attach
from common.template.user import get_settings_template, render_for_platform, get_detect_platform_template
from common.check.message import check_can_send_message


class SendPageMessage(TemplateView):
	""" Пишем сообщения со страниц пользователей или разных списков. Если у пользователя есть друзья,
	    то add_friend_message.html (возможность добавлять друзей), иначе add_message.html
	"""
	template_name = None

	def get(self,request,*args,**kwargs):
		if request.user.get_6_friends():
			self.template_name = get_settings_template("chat/message/add_friend_message.html", request.user, request.META['HTTP_USER_AGENT'])
		else:
			self.template_name = get_settings_template("chat/message/add_message.html", request.user, request.META['HTTP_USER_AGENT'])
		self.user = User.objects.get(pk=self.kwargs["pk"])
		return super(SendPageMessage,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context = super(SendPageMessage,self).get_context_data(**kwargs)
		context["form"] = MessageForm()
		context["member"] = self.user
		return context

	def post(self,request,*args,**kwargs):
		self.form=MessageForm(request.POST)
		self.user = User.objects.get(pk=self.kwargs["pk"])
		check_user_can_get_list(request.user, self.user)
		connections = request.POST.getlist("chat_items")

		if request.is_ajax() and self.form.is_valid():
			message = self.form.save(commit=False)
			if request.POST.get('text') or request.POST.get('photo') or \
				request.POST.get('video') or request.POST.get('music') or \
				request.POST.get('good') or request.POST.get('article') or \
				request.POST.get('playlist') or request.POST.get('video_list') or \
				request.POST.get('photo_list') or request.POST.get('doc_list') or \
				request.POST.get('doc') or request.POST.get('good_list'):
				if connections:
					connections += [self.user.pk,]
					_message = Message.create_chat_append_members_and_send_message(creator=request.user, users_ids=connections, text=message.text)
					get_message_attach(request, _message)
				else:
					_message = Message.get_or_create_chat_and_send_message(creator=request.user, repost=None, user=self.user, text=message.text)
					get_message_attach(request, _message)
				return HttpResponse()
			else:
				return HttpResponseBadRequest()


class LoadUserChatMessage(TemplateView):
	""" Отрисовываем новое сообщение для всех участников чата, кроме текущего (это фильтруем в socket.js) - он его и так увидит сразу.
		Отрисовываем на странице чата.
	"""
    template_name = None

    def get(self,request,*args,**kwargs):
        self.message = Message.objects.get(uuid=self.kwargs["uuid"]) 
        self.template_name = get_detect_platform_template("chat/message/load_chat_message.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(LoadUserChatMessage,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(LoadUserChatMessage,self).get_context_data(**kwargs)
        context["object"] = self.message
        return context

class LoadUserMessage(TemplateView):
	""" Отрисовываем новое сообщение для всех участников чата, кроме текущего (это фильтруем в socket.js) - он его и так увидит сразу.
		Отрисовываем на странице чата.
	"""
    template_name = None

    def get(self,request,*args,**kwargs):
        self.message = Message.objects.get(uuid=self.kwargs["uuid"])
        self.template_name = get_detect_platform_template("chat/message/load_message.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(LoadUserMessage,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(LoadUserMessage,self).get_context_data(**kwargs)
        context["object"] = self.message
        return context


class SendMessage(View):
	def post(self,request,*args,**kwargs):
		chat = Chat.objects.get(pk=self.kwargs["pk"])
		check_can_send_message(request.user, chat)
		form_post = MessageForm(request.POST)
		if request.POST.get('text') or request.POST.get('photo') or \
			request.POST.get('video') or request.POST.get('music') or \
			request.POST.get('good') or request.POST.get('article') or \
			request.POST.get('playlist') or request.POST.get('video_list') or \
			request.POST.get('photo_list') or request.POST.get('doc_list') or \
			request.POST.get('doc') or request.POST.get('good_list'):
			message = form_post.save(commit=False)
			message = Message.send_message(chat=chat, parent=None, creator=request.user, repost=None, text=message.text)
			get_message_attach(request, message)
			return render_for_platform(request, 'chat/message/message.html', {'object': message})
		else:
			return HttpResponseBadRequest()


class MessageParent(View):
    def post(self, request, *args, **kwargs):
        parent = Message.objects.get(uuid=self.kwargs["uuid"])
        chat = Chat.objects.get(pk=self.kwargs["pk"])
        check_can_send_message(request.user, chat)
        form_post = MessageForm(request.POST)
        if request.is_ajax() and form_post.is_valid():
            message = form_post.save(commit=False)
            if request.POST.get('text') or request.POST.get('photo') or \
                request.POST.get('video') or request.POST.get('music') or \
                request.POST.get('good') or request.POST.get('article') or \
                request.POST.get('playlist') or request.POST.get('video_list') or \
                request.POST.get('photo_list') or request.POST.get('doc_list') or \
                request.POST.get('doc') or request.POST.get('good_list'):
            	new_message = Message.send_message(chat=chat, parent=parent, creator=request.user, repost=None, text=message.text)
            	get_post_attach(request, new_post)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()


class MessageFixed(View):
	def get(self,request,*args,**kwargs):
		message = Message.objects.get(uuid=self.kwargs["uuid"])
		check_can_send_message(request.user, message.chat)
		if request.is_ajax():
			message.get_fixed_message_for_chat(message.chat.pk)
			return HttpResponse()
		else:
			raise Http404

class MessageUnFixed(View):
	def get(self,request,*args,**kwargs):
		message = Message.objects.get(uuid=self.kwargs["uuid"])
		if request.is_ajax():
			check_can_send_message(request.user, message.chat)
			message.is_fixed = False
			message.save(update_fields=['is_fixed'])
			return HttpResponse()
		else:
			raise Http404


class MessageFavorite(View):
	def get(self,request,*args,**kwargs):
		message = Message.objects.get(uuid=self.kwargs["uuid"])
		if request.is_ajax():
			check_can_send_message(request.user, message.chat)
			MessageFavorite.create_favorite(request.user.pk, message)
			return HttpResponse()
		else:
			raise Http404

class MessageUnFavorite(View):
	def get(self,request,*args,**kwargs):
		message = Message.objects.get(uuid=self.kwargs["uuid"])
		if request.is_ajax() and MessageFavorite.objects.filter(user_id=request.user.pk, message=message).exists():
			message.is_fixed = False
			message.save(update_fields=['is_fixed'])
			return HttpResponse()
		else:
			raise Http404


class MessageDelete(View):
	def get(self,request,*args,**kwargs):
		message = Message.objects.get(uuid=self.kwargs["uuid"])
		if request.is_ajax() and message.creator == request.user:
			message.is_deleted = True
			message.save(update_fields=['is_deleted'])
			return HttpResponse()
		else:
			raise Http404

class MessageAbortDelete(View):
	def get(self,request,*args,**kwargs):
		message = Message.objects.get(uuid=self.kwargs["uuid"])
		if request.is_ajax() and message.creator == request.user:
			message.is_deleted = False
			message.save(update_fields=['is_deleted'])
			return HttpResponse()
		else:
			raise Http404

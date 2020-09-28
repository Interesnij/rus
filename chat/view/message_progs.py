from django.views.generic.base import TemplateView
from django.views import View
from django.http import HttpResponse, HttpResponseBadRequest
from chat.forms import ChatForm, MessageForm
from chat.models import Chat, Message
from users.models import User
from django.shortcuts import render
from django.http import Http404
from common.check.user import check_user_can_get_list
from common.attach.message_attacher import get_message_attach
from common.template.user import get_settings_template
from common.check.message import check_can_send_message

class SendPageMessage(TemplateView):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.template_name = get_settings_template("message/add_message.html", request)
        self.user = User.objects.get(pk=self.kwargs["pk"])
		return super(SendPageMessage,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context = super(SendPageMessage,self).get_context_data(**kwargs)
		context["form"] = MessageForm()
		context["user"] = self.user
		return context

	def post(self,request,*args,**kwargs):
		self.form=CommunityForm(request.POST)
        self.user = User.objects.get(pk=self.kwargs["pk"])
        check_user_can_get_list(request.user, user)
        form_post = MessageForm(request.POST)
        connections = request.POST.getlist("chat_items")

		if not connections:
            return HttpResponseBadRequest()

        if request.is_ajax() and form_post.is_valid():
            message = self.form_post.save(commit=False)
            if request.POST.get('text') or request.POST.get('photo') or \
                request.POST.get('video') or request.POST.get('music') or \
                request.POST.get('good') or request.POST.get('article') or \
                request.POST.get('playlist') or request.POST.get('video_list') or \
                request.POST.get('photo_list') or request.POST.get('doc_list') or \
                request.POST.get('doc') or request.POST.get('good_list'):
                for object_id in connections:
                    if object_id[0] == "c":
                        chat = Chat.objects.get(pk=object_id[1:])
                        message = Message.send_message(chat=chat, parent=None, creator=request.user, forward=None, text=text)
                        get_message_attach(request, message)
                    elif object_id[0] == "u":
                        user = User.objects.get(pk=object_id[1:])
                        message = Message.get_or_create_chat_and_send_message(creator=request.user, parent=None, user=user, text=text)
                        get_message_attach(request, message)
                    else:
                        return HttpResponse("not ok")
                return HttpResponse()
            else:
                return HttpResponseBadRequest()


class SendMessage(View):
	def post(self,request,*args,**kwargs):
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

                message = Message.send_message(chat=chat, parent=None, creator=request.user, forward=None, text=message.text)
                get_message_attach(request, message)
            else:
                return HttpResponseBadRequest()


class UUPostRepost(View):
    def post(self, request, *args, **kwargs):
        forward = Message.objects.get(uuid=self.kwargs["uuid"])
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

            new_message = Message.send_message(chat=chat, parent=None, creator=request.user, forward=forward, text=message.text)
            get_post_attach(request, new_post)
            get_post_processing(new_post)
            return HttpResponse()
        else:
            return HttpResponseBadRequest()
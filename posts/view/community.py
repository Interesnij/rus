import re
MOBILE_AGENT_RE = re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
from django.views.generic.base import TemplateView
from django.views.generic import ListView
from communities.models import Community
from posts.models import Post, PostComment
from django.http import HttpResponse, HttpResponseBadRequest
from posts.forms import CommentForm
from django.views import View
from common.check.community import check_can_get_lists
from rest_framework.exceptions import ValidationError
from django.shortcuts import render
from rest_framework.exceptions import PermissionDenied
from common.template.post import get_permission_community_post
from django.http import Http404


class PostCommunityCommentList(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.item = Post.objects.get(uuid=self.kwargs["uuid"])
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        if not request.is_ajax() or not self.item.comments_enabled:
            raise Http404

        self.template_name = get_permission_community_post(self.community, "c_post_comment/", "comments.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(PostCommunityCommentList,self).get(request,*args,**kwargs)

    def get_context_data(self, **kwargs):
        context = super(PostCommunityCommentList, self).get_context_data(**kwargs)
        context['parent'] = self.item
        context['community'] = self.community
        return context

    def get_queryset(self):
        comments = self.item.get_comments()
        return comments


class PostCommunityCommentCreate(View):
    def post(self,request,*args,**kwargs):
        form_post = CommentForm(request.POST, request.FILES)
        community = Community.objects.get(pk=request.POST.get('pk'))
        post = Post.objects.get(uuid=request.POST.get('uuid'))
        if not community.is_comment_post_send_all() and not request.user.is_member_of_community_with_name(community.name):
            raise PermissionDenied("Ошибка доступа.")
        elif community.is_comment_post_send_admin() and not request.user.is_staff_of_community_with_name(community.name):
            raise PermissionDenied("Ошибка доступа.")
        elif request.is_ajax() and form_post.is_valid() and post.comments_enabled:
            check_can_get_lists(request.user,community)
            comment=form_post.save(commit=False)
            if request.POST.get('text') or  request.POST.get('photo') or request.POST.get('video') or request.POST.get('music') or request.POST.get('good') or request.POST.get('article'):
                from common.comment_attacher import get_comment_attach
                new_comment = comment.create_comment(commenter=request.user, parent_comment=None, post=post, text=comment.text)
                get_comment_attach(request, new_comment, "item_comment")
                if request.user.pk != post.creator.pk:
                    new_comment.notification_community_comment(request.user, community)
                return render(request, 'c_post_comment/admin_parent.html',{'comment': new_comment, 'community': community})
            else:
                return HttpResponseBadRequest()
        else:
            return HttpResponseBadRequest()

class PostCommunityReplyCreate(View):
    def post(self,request,*args,**kwargs):
        form_post = CommentForm(request.POST, request.FILES)
        community = Community.objects.get(pk=request.POST.get('pk'))
        parent = PostComment.objects.get(pk=request.POST.get('post_comment'))
        if not community.is_comment_post_send_all() and not request.user.is_member_of_community_with_name(community.name):
            raise PermissionDenied("Ошибка доступа.")
        elif community.is_comment_post_send_admin() and not request.user.is_staff_of_community_with_name(community.name):
            raise PermissionDenied("Ошибка доступа.")
        elif request.is_ajax() and form_post.is_valid() and parent.post.comments_enabled:
            check_can_get_lists(request.user,community)
            comment=form_post.save(commit=False)
            if request.POST.get('text') or  request.POST.get('photo') or request.POST.get('video') or request.POST.get('music') or request.POST.get('good') or request.POST.get('article'):
                from common.comment_attacher import get_comment_attach
                new_comment = comment.create_comment(commenter=request.user, parent_comment=parent, text=comment.text, post=None)
                get_comment_attach(request, new_comment, "item_comment")
                if request.user.pk != parent.commenter.pk:
                    new_comment.notification_community_reply_comment(request.user, community)
                return render(request, 'c_post_comment/admin_reply.html',{'reply': new_comment, 'community': community, 'comment': parent})
            else:
                return HttpResponseBadRequest()
        else:
            return HttpResponseBadRequest()


class PostCommentCommunityDelete(View):
    def get(self,request,*args,**kwargs):
        comment = PostComment.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.pk == comment.commenter.pk:
            comment.is_deleted = True
            comment.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostCommentCommunityAbortDelete(View):
    def get(self,request,*args,**kwargs):
        comment = PostComment.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.pk == comment.commenter.pk:
            comment.is_deleted = False
            comment.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostWallCommentCommunityDelete(View):
    def get(self,request,*args,**kwargs):
        comment = PostComment.objects.get(pk=self.kwargs["comment_pk"])
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(community.name):
            comment.is_deleted = True
            comment.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostWallCommentCommunityAbortDelete(View):
    def get(self,request,*args,**kwargs):
        comment = PostComment.objects.get(pk=self.kwargs["comment_pk"])
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(community.name):
            comment.is_deleted = False
            comment.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostCommunityFixed(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(item.community.name):
            item.is_fixed = True
            item.save(update_fields=['is_fixed'])
            return HttpResponse()
        else:
            raise Http404

class PostCommunityUnFixed(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(item.community.name):
            item.is_fixed = False
            item.save(update_fields=['is_fixed'])
            return HttpResponse()
        else:
            raise Http404

class PostCommunityOffComment(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(item.community.name):
            item.comments_enabled = False
            item.save(update_fields=['comments_enabled'])
            return HttpResponse()
        else:
            raise Http404

class PostCommunityOnComment(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(item.community.name):
            item.comments_enabled = True
            item.save(update_fields=['comments_enabled'])
            return HttpResponse()
        else:
            raise Http404

class PostCommunityDelete(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(item.community.name):
            item.is_deleted = True
            item.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostWallCommunityDelete(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(community.name):
            item.is_deleted = True
            item.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostWallCommunityAbortDelete(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        community = Community.objects.get(pk=self.kwargs["pk"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(community.name):
            item.is_deleted = False
            item.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostCommunityAbortDelete(View):
    def get(self,request,*args,**kwargs):
        item = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(item.community.name):
            item.is_deleted = False
            item.save(update_fields=['is_deleted'])
            return HttpResponse()
        else:
            raise Http404

class PostCommunityDetail(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(uuid=self.kwargs["uuid"])

        self.template_name = get_permission_community_post(self.community, "post_community/", "detail.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(PostCommunityDetail,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(PostCommunityDetail,self).get_context_data(**kwargs)
        context["object"] = self.object
        return context


class CommunityOnVotesPost(View):
    def get(self,request,*args,**kwargs):
        post = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(post.community.name):
            post.votes_on = True
            post.save(update_fields=['votes_on'])
            return HttpResponse()
        else:
            raise Http404

class CommunityOffVotesPost(View):
    def get(self,request,*args,**kwargs):
        post = Post.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and request.user.is_staff_of_community_with_name(post.community.name):
            post.votes_on = False
            post.save(update_fields=['votes_on'])
            return HttpResponse()
        else:
            raise Http404

def post_update_interactions(request):
    data_point = request.POST['id_value']
    item = Post.objects.get(uuid=data_point)
    data = {'likes': item.count_likers(), 'dislikes': item.count_dislikers(), 'comments': item.count_thread()}
    return JsonResponse(data)

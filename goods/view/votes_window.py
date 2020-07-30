from django.views.generic.base import TemplateView
from django.views.generic import ListView
from users.models import User
from goods.models import Good, GoodComment
from communities.models import Community
from common.model.votes import GoodVotes, GoodCommentVotes
from common.template.good import get_permission_community_good, get_permission_user_good


class GoodUserLikeWindow(TemplateView):
    template_name="good_votes/u_like.html"

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_user_good(self.good.creator, "good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodUserLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodUserLikeWindow,self).get_context_data(**kwargs)
        context["likes"] = self.good.window_likes()
        context["text"] = "Товар оценили:"
        context["class_name"] = "u_all_good_likes"
        return context

class GoodUserDislikeWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_user_good(self.good.creator, "good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodUserDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodUserDislikeWindow,self).get_context_data(**kwargs)
        context["dislikes"] = self.good.window_dislikes()
        context["text"] = "Товар не оценили:"
        context["class_name"] = "u_all_good_dislikes"
        return context


class GoodUserCommentLikeWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_user_good(self.comment.commenter, "good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodUserCommentLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodUserCommentLikeWindow,self).get_context_data(**kwargs)
        context["likes"] = self.comment.window_likes()
        context["text"] = "Коммент одобрили:"
        context["class_name"] = "u_all_good_comment_likes"
        return context


class GoodUserCommentDislikeWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_user_good(self.comment.commenter, "good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodUserCommentDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodUserCommentDislikeWindow,self).get_context_data(**kwargs)
        context["dislikes"] = self.comment.window_dislikes()
        context["text"] = "Коммент не одобрили:"
        context["class_name"] = "u_all_good_comment_dislikes"
        return context

class GoodCommunityLikeWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_community_good(self.good.community, "good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodCommunityLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodCommunityLikeWindow,self).get_context_data(**kwargs)
        context["likes"] = self.good.window_likes()
        context["text"] = "Товар одобрили:"
        context["class_name"] = "c_all_good_likes"
        return context

class GoodCommunityDislikeWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_community_good(self.good.community, "good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodCommunityDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodCommunityDislikeWindow,self).get_context_data(**kwargs)
        context["dislikes"] = self.good.window_dislikes()
        context["text"] = "Товар не одобрили:"
        context["class_name"] = "u_all_good_dislikes"
        return context

class GoodCommunityCommentLikeWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_community_good(self.comment.good.community, "good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodCommunityCommentLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodCommunityCommentLikeWindow,self).get_context_data(**kwargs)
        context["likes"] = self.comment.window_likes()
        context["text"] = "Коммент одобрили:"
        context["class_name"] = "c_all_good_comment_likes"
        return context

class GoodCommunityCommentDislikeWindow(TemplateView):
    template_name = None

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_community_good(self.comment.good.community, "good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(GoodCommunityCommentDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(GoodCommunityCommentDislikeWindow,self).get_context_data(**kwargs)
        context["dislikes"] = self.comment.window_dislikes()
        context["text"] = "Коммент не одобрили:"
        context["class_name"] = "c_all_good_comment_dislikes"
        return context


class AllGoodUserLikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_user_good(self.good.creator, "all_good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodUserLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodUserLikeWindow,self).get_context_data(**kwargs)
        context['good'] = self.good
        context['text'] = "Товар одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.good.likes().values("user_id"))
        return users

class AllGoodUserDislikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_user_good(self.good.creator, "all_good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodUserDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodUserDislikeWindow,self).get_context_data(**kwargs)
        context['item'] = self.good
        context['text'] = "Товар не одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.good.dislikes().values("user_id"))
        return users


class AllGoodUserCommentLikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_user_good(self.comment.commenter, "all_good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodUserCommentLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodUserCommentLikeWindow,self).get_context_data(**kwargs)
        context['comment'] = self.comment
        context['text'] = "Комментарий одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.comment.likes().values("user_id"))
        return users


class AllGoodUserCommentDislikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_user_good(self.comment.commenter, "all_good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodUserCommentDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodUserCommentDislikeWindow,self).get_context_data(**kwargs)
        context['comment'] = self.comment
        context['text'] = "Комментарий не одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.comment.dislikes().values("user_id"))
        return users


class AllGoodCommunityLikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_community_good(self.good.community, "all_good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodCommunityLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodCommunityLikeWindow,self).get_context_data(**kwargs)
        context['good'] = self.good
        context['text'] = "Товар одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.good.likes().values("user_id"))
        return users

class AllGoodCommunityDislikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        if self.good.votes_on:
            self.template_name = get_permission_community_good(self.good.community, "all_good_votes/", "page.html", request.user)
        else:
            self.template_name = "about.html"
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodCommunityDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodCommunityDislikeWindow,self).get_context_data(**kwargs)
        context['good'] = self.good
        context['text'] = "Товар не одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.good.dislikes().values("user_id"))
        return users


class AllGoodCommunityCommentLikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_community_good(self.comment.good.community, "all_good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodCommunityCommentLikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodCommunityCommentLikeWindow,self).get_context_data(**kwargs)
        context['comment'] = self.comment
        context['text'] = "Комментарий одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.comment.likes().values("user_id"))
        return users


class AllGoodCommunityCommentDislikeWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.comment = GoodComment.objects.get(pk=self.kwargs["comment_pk"])
        self.template_name = get_permission_community_good(self.comment.good.community, "all_good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodCommunityCommentDislikeWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodCommunityCommentDislikeWindow,self).get_context_data(**kwargs)
        context['comment'] = self.comment
        context['text'] = "Комментарий не одобрили:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.comment.dislikes().values("user_id"))
        return users


class AllGoodCommunityRepostWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.good = good.objects.get(uuid=self.kwargs["uuid"])
        self.template_name = get_permission_community_good(self.good.community, "all_good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodCommunityRepostWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodCommunityRepostWindow,self).get_context_data(**kwargs)
        context['good'] = self.good
        context['text'] = "Товаром поделились:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.good.get_reposts().values("user_id"))
        return users

class AllGoodUserRepostWindow(ListView):
    template_name = None
    paginate_by = 15

    def get(self,request,*args,**kwargs):
        self.good = Good.objects.get(uuid=self.kwargs["uuid"])
        self.template_name = get_permission_community_good(self.good.community, "all_good_votes/", "page.html", request.user)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            self.template_name = "mob_" + template_name
        return super(AllGoodUserRepostWindow,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AllGoodUserRepostWindow,self).get_context_data(**kwargs)
        context['good'] = self.good
        context['text'] = "Товаром поделились:"
        return context

    def get_queryset(self):
        users = User.objects.filter(id__in=self.good.get_reposts().values("user_id"))
        return users

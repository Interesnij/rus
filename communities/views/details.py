from django.views.generic.detail import DetailView
from django.views.generic.base import TemplateView
from main.models import Item
from communities.models import Community, CommunityMembership
from follows.models import CommunityFollow
from common.checkers import check_can_get_posts_for_community_with_name
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views import View
from django.shortcuts import render_to_response
from rest_framework.exceptions import PermissionDenied


class ItemsCommunity(View):
    def get(self,request,*args,**kwargs):
        context = {}
        template_name = None
        community=Community.objects.get(pk=self.kwargs["pk"])
        try:
            fixed = Item.objects.get(community=community, is_fixed=True)
        except:
            fixed = None

        if request.user.is_authenticated and request.user.is_member_of_community_with_name(community.name):
            if request.user.is_creator_of_community_with_name(community.name):
                template_name = "detail_sections/admin_list.html"
                item_list = community.get_posts().order_by('-created')
            elif request.user.is_moderator_of_community_with_name(community.name):
                template_name = "detail_sections/moderator_list.html"
                item_list = community.get_posts().order_by('-created')
            elif request.user.is_administrator_of_community_with_name(community.name):
                template_name = "detail_sections/admin_list.html"
                item_list = community.get_posts().order_by('-created')
            elif request.user.is_editor_of_community_with_name(community.name):
                template_name = "detail_sections/editor_list.html"
                item_list = community.get_posts().order_by('-created')
            else:
                template_name = "detail_sections/list.html"
                item_list = community.get_posts().order_by('-created')
        elif request.user.is_authenticated and community.is_public():
            template_name = "detail_sections/list.html"
            item_list = community.get_posts().order_by('-created')
        elif request.user.is_anonymous and community.is_public():
            template_name = "detail_sections/anon_list.html"
            item_list = community.get_posts().order_by('-created')
        current_page = Paginator(item_list, 10)
        page = request.GET.get('page')
        context['object'] = fixed
        context["community"]=community
        context['request_user'] = request.user
        try:
            context['items_list'] = current_page.page(page)
        except PageNotAnInteger:
            context['items_list'] = current_page.page(1)
        except EmptyPage:
            context['items_list'] = current_page.page(current_page.num_pages)
        return render_to_response(template_name, context)


class ItemCommunity(TemplateView):
    model=Item
    template_name="detail_sections/item.html"

    def get(self,request,*args,**kwargs):
        self.community=Community.objects.get(pk=self.kwargs["pk"])
        self.item = Item.objects.get(uuid=self.kwargs["uuid"])
        self.item.views += 1
        self.item.save()
        self.items = self.community.get_posts()
        self.next = self.items.filter(pk__gt=self.item.pk).order_by('pk').first()
        self.prev = self.items.filter(pk__lt=self.item.pk).order_by('-pk').first()

        if request.user.is_authenticated and request.user.is_member_of_community_with_name(self.community.name):
            if request.user.is_moderator_of_community_with_name(self.community.name):
                self.template_name = "detail_sections/moderator_item.html"
            elif request.user.is_administrator_of_community_with_name(self.community.name):
                self.template_name = "detail_sections/admin_item.html"
            else:
                self.template_name = "detail_sections/item.html"
        elif request.user.is_authenticated and community.is_public():
            self.template_name = "detail_sections/item.html"
        elif request.user.is_anonymous and community.is_public():
            self.template_name = "detail_sections/item.html"
        return super(ItemCommunity,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(ItemCommunity,self).get_context_data(**kwargs)
        context["object"]=self.item
        context["community"]=self.community
        context["next"]=self.next
        context["prev"]=self.prev
        context["request_user"]=request.user
        return context


class CommunityDetail(TemplateView):
    template_name = None
    membersheeps = None
    common_friends = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        self.membersheeps=self.community.get_community_with_name_members(self.community.name)[0:5]

        if request.user.is_authenticated and request.user.is_member_of_community_with_name(self.community.name):
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            if request.user.is_creator_of_community_with_name(self.community.name):
                self.template_name = "c_detail/creator_community.html"
            elif request.user.is_moderator_of_community_with_name(self.community.name):
                self.template_name = "c_detail/moderator_community.html"
            elif request.user.is_administrator_of_community_with_name(self.community.name):
                self.template_name = "c_detail/admin_community.html"
            elif request.user.is_editor_of_community_with_name(self.community):
                self.template_name = "c_detail/editor_community.html"
            elif request.user.is_advertiser_of_community_with_name(self.community.name):
                self.template_name = "c_detail/advertiser_community.html"
            elif request.user.is_star_from_community_with_name(self.community.name):
                self.template_name = "c_detail/star_community.html"
            else:
                self.template_name = "c_detail/member_community.html"
                self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
        elif request.user.is_authenticated and request.user.is_follow_from_community_with_name(self.community.pk):
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            self.template_name = "c_detail/follow_community.html"
        elif request.user.is_authenticated and request.user.is_banned_from_community_with_name(self.community):
            self.template_name = "c_detail/block_community.html"

        elif request.user.is_authenticated and self.community.is_public():
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            self.template_name = "c_detail/public_community.html"
        elif request.user.is_authenticated and self.community.is_closed():
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            self.template_name = "c_detail/close_community.html"
        elif request.user.is_authenticated and self.community.is_private():
            self.template_name = "c_detail/private_community.html"

        elif request.user.is_anonymous and self.community.is_public():
            self.template_name = "c_detail/anon_public_community.html"
        elif self.community.is_closed and request.user.is_anonymous():
            self.template_name = "c_detail/anon_close_community.html"
        elif request.user.is_anonymous and self.community.is_private():
            self.template_name = "c_detail/private_community.html"
        return super(CommunityDetail,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(CommunityDetail,self).get_context_data(**kwargs)
        context["membersheeps"]=self.membersheeps
        context["community"]=self.community
        context["common_friends"]=self.common_friends
        return context


class CommunityDetailReload(TemplateView):
    template_name = None
    membersheeps = None
    common_friends = None

    def get(self,request,*args,**kwargs):
        self.community = Community.objects.get(pk=self.kwargs["pk"])
        self.membersheeps=CommunityMembership.objects.filter(community__id=self.community.pk)[0:5]

        if request.user.is_authenticated and request.user.is_member_of_community_with_name(self.community.name):
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            if request.user.is_creator_of_community_with_name(self.community.name):
                self.template_name = "c_detail/creator_community.html"
            elif request.user.is_moderator_of_community_with_name(self.community.name):
                self.template_name = "c_detail/moderator_community.html"
            elif request.user.is_administrator_of_community_with_name(self.community.name):
                self.template_name = "c_detail/admin_community.html"
            elif request.user.is_star_from_community_with_name(self.community.name):
                self.template_name = "c_detail/star_community.html"
            else:
                self.template_name = "c_detail/member_community.html"
        elif request.user.is_authenticated and request.user.is_follow_from_community_with_name(self.community.pk):
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            self.template_name = "c_detail/follow_community.html"
        elif request.user.is_authenticated and request.user.is_banned_from_community_with_name(self.community):
            self.template_name = "c_detail/block_community.html"

        elif request.user.is_authenticated and self.community.is_public():
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            self.template_name = "c_detail/public_community.html"
        elif request.user.is_authenticated and self.community.is_closed():
            self.common_friends = request.user.get_common_friends_of_community(self.community.pk)[0:5]
            self.template_name = "c_detail/close_community.html"
        elif request.user.is_authenticated and self.community.is_private():
            self.template_name = "c_detail/private_community.html"
        return super(CommunityDetailReload,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context=super(CommunityDetailReload,self).get_context_data(**kwargs)
        context["membersheeps"]=self.membersheeps
        context["community"]=self.community
        context["common_friends"]=self.common_friends
        return context

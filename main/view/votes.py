import json
from users.models import User
from main.models import Item, ItemComment
from communities.models import Community
from django.http import HttpResponse
from django.views import View
from common.model.votes import ItemVotes, ItemCommentVotes
from common.checkers import check_is_not_blocked_with_user_with_id, check_is_connected_with_user_with_id, check_can_get_posts_for_community_with_name
from rest_framework.exceptions import PermissionDenied


class ItemUserLikeCreate(View):
    def get(self, request, **kwargs):
        item = Item.objects.get(uuid=self.kwargs["uuid"])
        user = User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=user.id)
            if user.is_closed_profile():
                check_is_connected_with_user_with_id(user=request.user, user_id=user.id)
        try:
            likedislike = ItemVotes.objects.get(parent=item, user=request.user)
            if likedislike.vote is not ItemVotes.LIKE:
                likedislike.vote = ItemVotes.LIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemVotes.DoesNotExist:
            ItemVotes.objects.create(parent=item, user=request.user, vote=ItemVotes.LIKE)
            result = True
            item.notification_user_like(request.user)
        likes = item.get_likes_for_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = item.get_dislikes_for_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")


class ItemCommentUserLikeCreate(View):
    def get(self, request, **kwargs):
        comment = ItemComment.objects.get(pk=self.kwargs["comment_pk"])
        user = User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=user.id)
            if user.is_closed_profile():
                check_is_connected_with_user_with_id(user=request.user, user_id=user.id)
        try:
            likedislike = ItemCommentVotes.objects.get(item=comment, user=request.user)
            if likedislike.vote is not ItemCommentVotes.LIKE:
                likedislike.vote = ItemCommentVotes.LIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemCommentVotes.DoesNotExist:
            ItemCommentVotes.objects.create(item=comment, user=request.user, vote=ItemCommentVotes.LIKE)
            result = True
            comment.notification_user_comment_like(request.user)
        likes = comment.get_likes_for_comment_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = comment.get_dislikes_for_comment_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")


class ItemUserDislikeCreate(View):
    def get(self, request, **kwargs):
        comment = ItemComment.objects.get(uuid=self.kwargs["comment_pk"])
        user = User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=user.id)
            if user.is_closed_profile():
                check_is_connected_with_user_with_id(user=request.user, user_id=user.id)
        try:
            likedislike = ItemVotes.objects.get(parent=item, user=request.user)
            if likedislike.vote is not ItemVotes.DISLIKE:
                likedislike.vote = ItemVotes.DISLIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemVotes.DoesNotExist:
            ItemVotes.objects.create(parent=item, user=request.user, vote=ItemVotes.DISLIKE)
            result = True
            item.notification_user_dislike(request.user)
        likes = item.get_likes_for_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = item.get_dislikes_for_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")


class ItemCommentUserDislikeCreate(View):
    def get(self, request, **kwargs):
        comment = ItemComment.objects.get(pk=self.kwargs["comment_pk"])
        user = User.objects.get(pk=self.kwargs["pk"])
        if user != request.user:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=user.id)
            if user.is_closed_profile():
                check_is_connected_with_user_with_id(user=request.user, user_id=user.id)
        try:
            likedislike = ItemCommentVotes.objects.get(item=comment, user=request.user)
            if likedislike.vote is not ItemCommentVotes.DISLIKE:
                likedislike.vote = ItemCommentVotes.DISLIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemCommentVotes.DoesNotExist:
            ItemCommentVotes.objects.create(item=comment, user=request.user, vote=ItemCommentVotes.DISLIKE)
            result = True
            comment.notification_user_comment_dislike(request.user)
        likes = comment.get_likes_for_comment_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = comment.get_dislikes_for_comment_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")


class ItemCommunityLikeCreate(View):
    def post(self, request, **kwargs):
        item = Item.objects.get(uuid=self.kwargs["uuid"])
        community = Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_posts_for_community_with_name(request.user,community.name)
        try:
            likedislike = ItemVotes.objects.get(parent=item, user=request.user)
            if likedislike.vote is not ItemVotes.LIKE:
                likedislike.vote = ItemVotes.LIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemVotes.DoesNotExist:
            ItemVotes.objects.create(parent=item, user=request.user, vote=ItemVotes.LIKE)
            result = True
            item.notification_community_like(request.user)
        likes = item.get_likes_for_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = item.get_dislikes_for_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")


class ItemCommunityDislikeCreate(View):
    def post(self, request, **kwargs):
        item = Item.objects.get(uuid=self.kwargs["uuid"])
        community = Community.objects.get(pk=self.kwargs["pk"])
        check_can_get_posts_for_community_with_name(request.user,community.name)
        try:
            likedislike = ItemVotes.objects.get(parent=item, user=request.user)
            if likedislike.vote is not ItemVotes.DISLIKE:
                likedislike.vote = ItemVotes.DISLIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemVotes.DoesNotExist:
            ItemVotes.objects.create(parent=item, user=request.user, vote=ItemVotes.DISLIKE)
            result = True
            item.notification_community_dislike(request.user)
        likes = item.get_likes_for_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = item.get_dislikes_for_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")

class ItemCommentCommunityLikeCreate(View):
    def post(self, request, **kwargs):
        comment = ItemComment.objects.get(pk=self.kwargs["comment_pk"])
        user = User.objects.get(pk=self.kwargs["pk"])
        check_can_get_posts_for_community_with_name(request.user,community.name)
        try:
            likedislike = ItemCommentVotes.objects.get(item=comment, user=request.user)
            if likedislike.vote is not ItemCommentVotes.LIKE:
                likedislike.vote = ItemCommentVotes.LIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemCommentVotes.DoesNotExist:
            ItemCommentVotes.objects.create(item=comment, user=request.user, vote=ItemCommentVotes.LIKE)
            result = True
            comment.notification_community_comment_like(request.user)
        likes = comment.get_likes_for_comment_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = comment.get_dislikes_for_comment_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")


class ItemCommentCommunityDislikeCreate(View):
    def post(self, request, **kwargs):
        comment = ItemComment.objects.get(pk=self.kwargs["comment_pk"])
        user = User.objects.get(pk=self.kwargs["pk"])
        check_can_get_posts_for_community_with_name(request.user,community.name)
        try:
            likedislike = ItemCommentVotes.objects.get(item=comment, user=request.user)
            if likedislike.vote is not ItemCommentVotes.DISLIKE:
                likedislike.vote = ItemCommentVotes.DISLIKE
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except ItemCommentVotes.DoesNotExist:
            ItemCommentVotes.objects.create(item=comment, user=request.user, vote=ItemCommentVotes.DISLIKE)
            result = True
            comment.notification_community_comment_dislike(request.user)
        likes = comment.get_likes_for_comment_item(request.user)
        if likes.count() != 0:
            like_count = likes.count()
        else:
            like_count = ""
        dislikes = comment.get_dislikes_for_comment_item(request.user)
        if dislikes.count() != 0:
            dislike_count = dislikes.count()
        else:
            dislike_count = ""
        return HttpResponse(json.dumps({"result": result,"like_count": str(like_count),"dislike_count": str(dislike_count)}),content_type="application/json")

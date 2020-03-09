import uuid
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from common.checkers import *
from django.db.models import Q
from rest_framework.exceptions import PermissionDenied


class User(AbstractUser):
    moderated_object = GenericRelation('moderation.ModeratedObject', related_query_name='users')
    is_email_verified = models.BooleanField(default=False)
    are_guidelines_accepted = models.BooleanField(default=False)
    is_deleted = models.BooleanField(verbose_name="Удален", default=False, )
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="uuid")
    last_activity= models.DateTimeField(default=timezone.now, blank=True, verbose_name='Активность')

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'

    def get_full_name(self):
        return  str(self.first_name) + " " + str(self.last_name)

    def get_online(self):
        from datetime import datetime, timedelta

        now = datetime.now()
        onl = self.last_activity + timedelta(minutes=3)
        if now < onl:
            return True
        else:
            return False

    def get_request_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def __str__(self):
        return self.get_full_name()

    def get_favorite_communities(self):
        return self.favorite_communities.all()

    def get_staffed_communities(self):
        from communities.models import Community

        query = Q(Q(memberships__user=self, memberships__is_administrator=True) | Q(memberships__user=self, memberships__is_moderator=True) | Q(memberships__user=self, memberships__is_editor=True))
        return Community.objects.filter(query)

        '''''проги для подписчиков  60-109'''''

    def follow_user(self, user):
        return self.follow_user_with_id(user.pk)

    def follow_user_with_id(self, user_id):
        from follows.models import Follow

        check_can_follow_user_with_id(user_id=user_id, user=self)
        if self.pk == user_id:
            raise ValidationError('Вы не можете подписаться сами на себя',)
        follow = Follow.create_follow(user_id=self.pk, followed_user_id=user_id)
        return follow

    def community_follow_user(self, community_name):
        return self.follow_community_with_name(community_name)

    def follow_community_with_name(self, community_name):
        from follows.models import CommunityFollow

        check_can_join_community_with_name(user=self, community_name=community_name)
        follow = CommunityFollow.create_follow(user_id=self.pk, community_name=community_name)
        return follow

    def community_unfollow_user(self, community_name):
        return self.unfollow_community_with_name(community_name)

    def unfollow_community_with_name(self, community_name):
        from follows.models import CommunityFollow

        check_can_join_community_with_name(user=self, community_name=community_name)
        follow = CommunityFollow.objects.get(user=self,community=community_name)
        follow.delete()

    def frend_user(self, user):
        return self.frend_user_with_id(user.pk)

    def frend_user_with_id(self, user_id):
        from follows.models import Follow
        from frends.models import Connect

        check_can_connect_with_user_with_id(user=self, user_id=user_id)
        if self.pk == user_id:
            raise ValidationError('Вы не можете добавить сами на себя',)
        frend = Connect.create_connection(user_id=self.pk, target_user_id=user_id)
        follow = Follow.objects.get(user=user_id, followed_user_id=self.pk)
        follow.delete()
        return frend

    def unfollow_user(self, user):
        return self.unfollow_user_with_id(user.pk)

    def unfollow_user_with_id(self, user_id):
        from follows.models import Follow

        check_not_can_follow_user_with_id(user=self, user_id=user_id)
        follow = Follow.objects.get(user=self,followed_user=user_id)
        follow.delete()

    def unfrend_user(self, user):
        return self.unfrend_user_with_id(user.pk)

    def unfrend_user_with_id(self, user_id):
        from follows.models import Follow

        check_is_following_user_with_id(user=self, user_id=user_id)
        follow = Follow.create_follow(user_id=user_id, followed_user_id=self.pk)
        connection = self.connections.get(target_connection__user_id=user_id)
        connection.delete()

    def unblock_user_with_pk(self, pk):
        user = User.objects.get(pk=pk)
        return self.unblock_user_with_id(user_id=user.pk)

    def unblock_user_with_id(self, user_id):
        check_can_unblock_user_with_id(user=self, user_id=user_id)
        self.user_blocks.filter(blocked_user_id=user_id).delete()
        return User.objects.get(pk=user_id)

    def block_user_with_pk(self, pk):
        user = User.objects.get(pk=pk)
        return self.block_user_with_id(user_id=user.pk)

    def block_user_with_id(self, user_id):
        check_can_block_user_with_id(user=self, user_id=user_id)

        if self.is_connected_with_user_with_id(user_id=user_id):
            self.disconnect_from_user_with_id(user_id=user_id)
        elif self.is_following_user_with_id(user_id=user_id):
            self.unfollow_user_with_id(user_id=user_id)

        user_to_block = User.objects.get(pk=user_id)
        if user_to_block.is_following_user_with_id(user_id=self.pk):
            user_to_block.unfollow_user_with_id(self.pk)

        UserBlock.create_user_block(blocker_id=self.pk, blocked_user_id=user_id)
        return user_to_block

    def search_followers_with_query(self, query):
        followers_query = Q(follows__followed_user_id=self.pk, is_deleted=False)
        names_query = Q(username__icontains=query)
        names_query.add(Q(profile__name__icontains=query), Q.OR)
        followers_query.add(names_query, Q.AND)
        return User.objects.filter(followers_query).distinct()

    def search_followings_with_query(self, query):
        followings_query = Q(followers__user_id=self.pk, is_deleted=False)
        names_query = Q(username__icontains=query)
        names_query.add(Q(profile__name__icontains=query), Q.OR)
        followings_query.add(names_query, Q.AND)
        return User.objects.filter(followings_query).distinct()

    def _make_followers_query(self):
        return Q(follows__followed_user_id=self.pk, is_deleted=False)

    def _make_followings_query(self):
        return Q(followers__user_id=self.pk, is_deleted=False)


    '''''проверки is для подписчиков  113-169'''''

    def is_connected_with_user(self, user):
        return self.is_connected_with_user_with_id(user.pk)

    def is_blocked_with_user_with_id(self, user_id):
        from users.model.list import UserBlock
        return UserBlock.users_are_blocked(user_a_id=self.pk, user_b_id=user_id)

    def is_connected_with_user_with_id(self, user_id):
        return self.connections.filter(target_connection__user_id=user_id).exists()

    def is_connected_with_user_with_username(self, username):
        return self.connections.filter(target_connection__user__username=username).exists()

    def is_pending_confirm_connection_for_user_with_id(self, user_id):
        if not self.is_connected_with_user_with_id(user_id):
            return False
        connection = self.connections.filter(target_connection__user_id=user_id).get()
        return not connection.circles.exists()

    def is_global_moderator(self):
        moderators_community_name = settings.MODERATORS_COMMUNITY_NAME
        return self.is_member_of_community_with_name(community_name=moderators_community_name)

    def is_invited_to_community_with_name(self, community_name):
        from communities.models import Community

        return Community.is_user_with_username_invited_to_community_with_name(username=self.username, community_name=community_name)

    def is_staff_of_community_with_name(self, community_name):
        return self.is_administrator_of_community_with_name(community_name=community_name) or self.is_moderator_of_community_with_name(community_name=community_name) or self.is_editor_of_community_with_name(community_name=community_name)

    def is_member_of_community_with_name(self, community_name):
        return self.communities_memberships.filter(community__name=community_name).exists()

    def is_banned_from_community_with_name(self, community_name):
        return self.banned_of_communities.filter(name=community_name).exists()

    def is_star_from_community_with_name(self, community_name):
        return self.favorite_communities.filter(name=community_name).exists()

    def is_follow_from_community_with_name(self, community_pk):
        from follows.models import CommunityFollow

        try:
            return CommunityFollow.objects.get(community__id=community_pk, user=self).exists()
        except:
            return False

    def is_closed_profile(self):
        from users.model.settings import UserPrivate

        try:
            user_private = UserPrivate.objects.get(user=self)
            return user_private.is_private
        except:
            user_private = UserPrivate.objects.create(user=self)
            return False

    def is_creator_of_community_with_name(self, community_name):
        return self.created_communities.filter(name=community_name).exists()

    def is_staffed_user(self):
        return self.communities_memberships.filter(Q(is_administrator=True) | Q(is_moderator=True) | Q(is_editor=True)).exists()

    def is_staff_of_community_with_name(self, community_name):
        return self.is_administrator_of_community_with_name(community_name=community_name) or self.is_moderator_of_community_with_name(community_name=community_name) or self.is_editor_of_community_with_name(community_name=community_name) or self.is_advertiser_of_community_with_name(community_name=community_name)

    def is_administrator_of_community_with_name(self, community_name):
        return self.communities_memberships.filter(community__name=community_name, is_administrator=True).exists()

    def is_moderator_of_community_with_name(self, community_name):
        return self.communities_memberships.filter(community__name=community_name, is_moderator=True).exists()

    def is_advertiser_of_community_with_name(self, community_name):
        return self.communities_memberships.filter(community__name=community_name, is_advertiser=True).exists()

    def is_editor_of_community_with_name(self, community_name):
        return self.communities_memberships.filter(community__name=community_name, is_editor=True).exists()

    def is_following_user_with_id(self, user_id):
        return self.follows.filter(followed_user__id=user_id).exists()

    def is_following_user_with_username(self, user_username):
        return self.follows.filter(followed_user__username=user_username).exists()

    def is_album_exists(self):
        return self.created_user.filter(creator__id=self.pk, is_generic=False, community=None).exists()

    def is_photo_exists(self):
        return self.photo_creator.filter(creator__id=self.pk, community=None).exists()

    def is_suspended(self):
        from moderation.models import ModerationPenalty

        return self.moderation_penalties.filter(type=ModerationPenalty.TYPE_SUSPENSION, expiration__gt=timezone.now()).exists()

    def is_track_exists(self, track_id):
        return self.user_playlist.filter(track__id=track_id, name="my_first_generic_playlist_number_12345678900000000").exists()

    def is_user_playlist(self):
        from music.models import UserTempSoundList

        try:
            UserTempSoundList.objects.get(user=self, tag=None, list=None, genre=None)
            return True
        except:
            return False

    def is_tag_playlist(self, tag):
        from music.models import UserTempSoundList

        try:
            UserTempSoundList.objects.get(user=self, tag=tag, list=None, genre=None).exists()
            return True
        except:
            return False

    def is_genre_playlist(self, genre):
        from music.models import UserTempSoundList

        try:
            UserTempSoundList.objects.get(user=self, tag=None, list=None, genre=genre).exists()
            return True
        except:
            return False


    ''''' количества всякие  196-216 '''''

    def count_followers(self):
        followed_users = self.follows.values('followed_user_id')
        followed_users_count = followed_users.count()
        return followed_users_count

    def count_following(self):
        followed_users = self.followers.values('user_id')
        followed_users_count = followed_users.count()
        return followed_users_count

    def count_connections(self):
        return self.connections.values('user_id').count()

    def count_community(self):
        return self.communities_memberships.values('user_id').count()

    def count_photos(self):
        return self.photo_creator.values('creator_id').count()

    def count_albums(self):
        return self.created_user.values('creator_id').count()

    def count_goods(self):
        from goods.models import Good

        goods = Good.objects.filter(creator__id=self.pk,is_deleted=False).count()
        return goods

    def count_posts(self):
        return self.posts.count()


    ''''' GET всякие  219-186 '''''
    def get_pop_connection(self):
        from moderation.models import ModeratedObject

        my_frends = self.connections.values('target_user_id')
        my_frends_ids = [target_user['target_user_id'] for target_user in my_frends]
        connection_query = Q(id__in=my_frends_ids)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        connection_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        connection_query.add(~Q(Q(blocked_by_users__blocker_id=self.id) | Q(user_blocks__blocked_user_id=self.id)), Q.AND)
        frends = User.objects.filter(connection_query)
        return frends[0:5]

    def get_all_connection(self):
        from moderation.models import ModeratedObject

        my_frends = self.connections.values('target_user_id')
        my_frends_ids = [target_user['target_user_id'] for target_user in my_frends]
        connection_query = Q(id__in=my_frends_ids)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        connection_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        connection_query.add(~Q(Q(blocked_by_users__blocker_id=self.id) | Q(user_blocks__blocked_user_id=self.id)), Q.AND)
        frends = User.objects.filter(connection_query)
        return frends

    def get_online_connection(self):
        frends = self.get_all_connection()
        query = []
        for frend in frends:
            if frend.get_online():
                query += [frend,]
        return query

    def get_pop_communities(self):
        from communities.models import Community

        query = Q(memberships__user=self)
        communities = Community.objects.filter(query)
        return communities[0:6]

    def get_online_connection_count(self):
        frends = self.get_all_connection()
        query = []
        for frend in frends:
            if frend.get_online():
                query += [frend,]
        return len(query)

    def get_pop_online_connection(self):
        frends = self.get_all_connection()
        query = []
        for frend in frends:
            if frend.get_online():
                query += [frend,]
        return query[0:5]

    def get_posts(self):
        from main.models import Item
        from moderation.models import ModeratedObject

        posts_query = Q(creator_id=self.id, is_deleted=False, is_fixed=False, status=Item.STATUS_PUBLISHED, community=None)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        posts_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        items = Item.objects.filter(posts_query)
        return items
    def get_draft_posts(self):
        from main.models import Item
        from moderation.models import ModeratedObject

        posts_query = Q(creator_id=self.id, is_deleted=False, is_fixed=False, status=Item.STATUS_DRAFT, community=None)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        posts_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        items = Item.objects.filter(posts_query)
        return items
    def get_archive_posts(self):
        from main.models import Item
        from moderation.models import ModeratedObject

        posts_query = Q(creator_id=self.id, is_deleted=False, is_fixed=False, status=Item.STATUS_ARHIVED, community=None)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        posts_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        items = Item.objects.filter(posts_query)
        return items

    def get_photos(self):
        from gallery.models import Photo
        from moderation.models import ModeratedObject

        photos_query = Q(creator_id=self.id, is_deleted=False, is_public=True, community=None)
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos

    def get_profile_photos(self):
        from gallery.models import Photo
        from moderation.models import ModeratedObject

        photos_query = Q(creator_id=self.id, is_deleted=False, is_public=True, community=None)
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos[0:6]

    def get_my_photos(self):
        from gallery.models import Photo
        from moderation.models import ModeratedObject

        photos_query = Q(creator_id=self.id, is_deleted=False, community=None)
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos

    def get_photos_for_album(self, album_id):
        from gallery.models import Photo
        from moderation.models import ModeratedObject

        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query = Q(album_id=album_id, is_deleted=False, is_public=True)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos
    def get_photos_for_my_album(self, album_id):
        from gallery.models import Photo
        from moderation.models import ModeratedObject

        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query = Q(album_id=album_id, is_deleted=False)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos

    def get_avatar_photos(self):
        from gallery.models import Photo
        from moderation.models import ModeratedObject

        photos_query = Q(creator_id=self.id, is_deleted=False, community=None, album_2__title="Фото со страницы", album_2__is_generic=True)
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        avatar_photos = Photo.objects.filter(photos_query)
        return avatar_photos

    def get_albums(self):
        from gallery.models import Album
        from moderation.models import ModeratedObject

        albums_query = Q(creator_id=self.id, is_deleted=False, is_public=True, community=None)
        exclude_reported_and_approved_albums_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        albums_query.add(exclude_reported_and_approved_albums_query, Q.AND)
        albums = Album.objects.filter(albums_query)
        return albums
    def get_my_albums(self):
        from gallery.models import Album
        from moderation.models import ModeratedObject

        albums_query = Q(creator_id=self.id, is_deleted=False, community=None)
        exclude_reported_and_approved_albums_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        albums_query.add(exclude_reported_and_approved_albums_query, Q.AND)
        albums = Album.objects.filter(albums_query)
        return albums

    def get_goods(self):
        from goods.models import Good
        from moderation.models import ModeratedObject

        goods_query = Q(creator_id=self.id, is_deleted=False, status=Good.STATUS_PUBLISHED)
        exclude_reported_and_approved_goods_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        goods_query.add(exclude_reported_and_approved_goods_query, Q.AND)
        goods = Good.objects.filter(goods_query)
        return goods
    def get_my_goods(self):
        from goods.models import Good
        from moderation.models import ModeratedObject

        goods_query = Q(creator_id=self.id, is_deleted=False)
        exclude_reported_and_approved_goods_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        goods_query.add(exclude_reported_and_approved_goods_query, Q.AND)
        goods = Good.objects.filter(goods_query)
        return goods

    def get_music(self):
        from music.models import SoundList, SoundcloudParsing
        from moderation.models import ModeratedObject

        exclude_reported_and_approved_music_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        list = SoundList.objects.get(creator_id=self.id, community=None, name="my_first_generic_playlist_number_12345678900000000")
        music_query = Q(players=list, is_deleted=False)
        music_query.add(exclude_reported_and_approved_music_query, Q.AND)
        music_list = SoundcloudParsing.objects.filter(music_query)
        return music_list

    def get_my_music(self):
        from music.models import SoundList, SoundcloudParsing
        from moderation.models import ModeratedObject

        exclude_reported_and_approved_music_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        list = SoundList.objects.get(creator_id=self.id, community=None, name="my_first_generic_playlist_number_12345678900000000")
        music_query = Q(players=list, is_deleted=False)
        music_query.add(exclude_reported_and_approved_music_query, Q.AND)
        music_list = SoundcloudParsing.objects.filter(music_query)
        return music_list

    def my_playlist(self):
        from common.utils import safe_json
        from music.models import SoundList, UserTempSoundList, SoundTags, SoundGenres

        temp_list = UserTempSoundList.objects.get(user=self)
        try:
            list = SoundList.objects.get(pk=temp_list.list.pk)
        except:
            list = None
        try:
            tag_music = SoundTags.objects.get(pk=temp_list.tag.pk)
        except:
            tag_music = None
        try:
            genre_music = SoundGenres.objects.get(pk=temp_list.genre.pk)
        except:
            genre_music = None
        if list:
            return list.get_json_playlist()
        elif tag_music:
            return tag_music.get_json_playlist()
        elif genre_music:
            return genre_music.get_json_playlist()
        else:
            playlist = []
            queryset = reversed(self.get_my_music())
            for track in queryset:
                url = track.uri + '/stream?client_id=' + 'dce5652caa1b66331903493735ddd64d'
                genre = str(track.genre)
                data = {}
                data['title'] = track.title
                data['artwork_url'] = track.artwork_url
                data['mp3'] = url
                data['genre'] = genre
                if self.is_track_exists(track.pk):
                    data['is_my_track'] = 1
                else:
                    data['is_my_track'] = 0
                data['pk'] = track.pk
                playlist.append(data)
            if playlist:
                cached_playlist = safe_json(playlist)
                return cached_playlist
            else:
                playlist = False

    def get_avatar(self):
        try:
            avatar = self.get_avatar_photos().order_by('-id')[0]
        except:
            avatar = None
        return avatar

    def get_followers(self):
        followers_query = self._make_followers_query()
        return User.objects.filter(followers_query)

    def get_pop_followers(self):
        followers_query = self._make_followers_query()
        return User.objects.filter(followers_query)[0:6]

    def get_followings(self):
        followings_query = self._make_followings_query()
        return User.objects.filter(followings_query)

    def get_timeline_posts(self):
        return self._get_timeline_posts()

    def _get_timeline_posts(self):
        from main.models import Item
        from moderation.models import ModeratedObject

        posts_select_related = ('creator', 'community')
        items_only = ('id', 'uuid', 'created', 'creator__username', 'creator__id', 'creator__profile__id', 'community__id', 'community__name')
        reported_posts_exclusion_query = ~Q(moderated_object__reports__reporter_id=self.pk)
        own_posts_query = Q(creator=self.pk, community__isnull=True, is_deleted=False, status=Item.STATUS_PUBLISHED)
        own_posts_query.add(reported_posts_exclusion_query, Q.AND)
        own_posts_queryset = self.items.select_related(*posts_select_related).only(*items_only).filter(own_posts_query)

        community_posts_query = Q(community__memberships__user__id=self.pk, is_closed=False, is_deleted=False, status=Item.STATUS_PUBLISHED)
        community_posts_query.add(~Q(Q(creator__blocked_by_users__blocker_id=self.pk) | Q(creator__user_blocks__blocked_user_id=self.pk)), Q.AND)
        community_posts_query.add(~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED), Q.AND)
        community_posts_query.add(reported_posts_exclusion_query, Q.AND)
        community_posts_queryset = Item.objects.select_related(*posts_select_related).only(*items_only).filter(community_posts_query)

        followed_users = self.follows.values('followed_user_id')
        followed_users_ids = [followed_user['followed_user_id'] for followed_user in followed_users]
        followed_users_query = Q(creator__in=followed_users_ids, creator__user_private__is_private=False, is_deleted=False, status=Item.STATUS_PUBLISHED)
        followed_users_query.add(reported_posts_exclusion_query, Q.AND)
        followed_users_queryset = Item.objects.select_related(*posts_select_related).only(*items_only).filter(followed_users_query)

        frends = self.connections.values('target_user_id')
        frends_ids = [target_user['target_user_id'] for target_user in frends]
        frends_query = Q(creator__in=frends_ids, is_deleted=False, status=Item.STATUS_PUBLISHED)
        frends_query.add(reported_posts_exclusion_query, Q.AND)
        frends_queryset = Item.objects.select_related(*posts_select_related).only(*items_only).filter(frends_query)
        final_queryset = own_posts_queryset.union(community_posts_queryset, followed_users_queryset, frends_queryset)
        return final_queryset

    def get_follows(self):
        reported_posts_exclusion_query = ~Q(moderated_object__reports__reporter_id=self.pk)
        followed_users = self.followers.values('user_id')
        followed_users_ids = [followed_user['user_id'] for followed_user in followed_users]
        followed_users_query = Q(id__in=followed_users_ids)
        followed_users_query.add(reported_posts_exclusion_query, Q.AND)
        query = User.objects.filter(followed_users_query)
        return query

    def get_possible_friends(self):
        frends = self.connections.values('target_user_id')
        if not frends:
            return "not frends"
        frends_ids = [target_user['target_user_id'] for target_user in frends]
        query = Q()
        for frend in frends_ids:
            user = User.objects.get(pk=frend)
            frends_frends = user.connections.values('target_user_id')
            frend_frend_ids = [target_user['target_user_id'] for target_user in frends_frends]
            _query = Q(id__in=frend_frend_ids)
            blocked = ~Q(Q(blocked_by_users__blocker_id=self.pk) | Q(user_blocks__blocked_user_id=self.pk))
            connections = ~Q(Q(connections__user_id=self.pk) | Q(targeted_connections__target_user_id=self.pk))
            _query.add(blocked, Q.AND)
            _query.add(connections, Q.AND)
            query.add(_query, Q.AND)
        connection = User.objects.filter(query)
        return connection

    def get_possible_friends_10(self):
        frends = self.connections.values('target_user_id')
        if not frends:
            return False
        frends_ids = [target_user['target_user_id'] for target_user in frends]
        query = Q()
        for frend in frends_ids:
            user = User.objects.get(pk=frend)
            frends_frends = user.connections.values('target_user_id')
            frend_frend_ids = [target_user['target_user_id'] for target_user in frends_frends]
            _query = Q(id__in=frend_frend_ids)
            blocked = ~Q(Q(blocked_by_users__blocker_id=self.pk) | Q(user_blocks__blocked_user_id=self.pk))
            connections = ~Q(Q(connections__user_id=self.pk) | Q(targeted_connections__target_user_id=self.pk))
            _query.add(blocked, Q.AND)
            _query.add(connections, Q.AND)
            query.add(_query, Q.AND)
        connection = User.objects.filter(query)
        return connection[0:10]

    def get_common_friends_of_user(self, user):
        user = User.objects.get(pk=user.pk)
        if self.pk == user.pk:
            return ""
        my_frends = self.connections.values('target_user_id')
        user_frends = user.connections.values('target_user_id')
        my_frends_ids = [target_user['target_user_id'] for target_user in my_frends]
        user_frend_ids = [target_user['target_user_id'] for target_user in user_frends]
        result=list(set(my_frends_ids) & set(user_frend_ids))
        query = Q(id__in=result)
        connection = User.objects.filter(query)
        return connection

    def get_common_friends_of_community(self, community_id):
        from communities.models import Community

        community = Community.objects.get(pk=community_id)
        my_frends = self.connections.values('target_user_id')
        community_frends = community.memberships.values('user_id')
        my_frends_ids = [target_user['target_user_id'] for target_user in my_frends]
        community_frends_ids = [user_id['user_id'] for user_id in community_frends]
        result=list(set(my_frends_ids) & set(community_frends_ids))
        query = Q(id__in=result)
        connection = User.objects.filter(query)
        return connection

    def get_template_user(self, folder, template, request):
        import re
        from stst.models import UserNumbers

        if self.pk == request.user.pk:
            template_name = folder + "my_" + template
        elif request.user.pk != self.pk and request.user.is_authenticated:
            if request.user.is_blocked_with_user_with_id(user_id=self.pk):
                template_name = folder + "block_" + template
            elif self.is_closed_profile():
                if not request.user.is_connected_with_user_with_id(user_id=self.pk):
                    template_name = folder + "close_" + template
                else:
                    template_name = folder + "frend_" + template
            else:
                template_name = folder + template
            try:
                obj = UserNumbers.objects.get(visitor=request.user.pk, target=self.pk)
                obj.count = obj.count + 1
                obj.save(update_fields=['count'])
            except:
                obj = UserNumbers.objects.create(visitor=request.user.pk, target=self.pk)
                obj.count = obj.count + 1
                obj.save(update_fields=['count'])
        elif request.user.is_anonymous and self.is_closed_profile():
            template_name = folder + "close_" + template
        elif request.user.is_anonymous and not self.is_closed_profile():
            template_name = folder + "anon_" + template

        MOBILE_AGENT_RE=re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            template_name = "mob_" + template_name
        return template_name

    def get_template_list_user(self, folder, template, request):
        import re

        if self.pk == request.user.pk:
            template_name = folder + "my_" + template
        elif self != request.user and request.user.is_authenticated:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.id)
            template_name = folder + template
            if self.is_closed_profile():
                check_is_connected_with_user_with_id(user=request.user, user_id=self.id)
                template_name = folder + "frend_" + template
        elif request.user.is_anonymous and not self.is_closed_profile():
            template_name = folder + "anon_" + template
        elif request.user.is_anonymous and self.is_closed_profile():
            raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')

        MOBILE_AGENT_RE=re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            template_name = "mob_" + template_name
        return template_name

    def get_permission_list_user(self, folder, template, request):
        import re

        if self.pk == request.user.pk:
            template_name = folder + "my_" + template
        elif self != request.user and request.user.is_authenticated:
            check_is_not_blocked_with_user_with_id(user=request.user, user_id=self.id)
            template_name = folder + template
            if self.is_closed_profile():
                check_is_connected_with_user_with_id(user=request.user, user_id=self.id)
                template_name = folder + template
        elif request.user.is_anonymous and not self.is_closed_profile():
            template_name = folder + template
        elif request.user.is_anonymous and self.is_closed_profile():
            raise PermissionDenied('Это закрытый профиль. Только его друзья могут видеть его информацию.')

        MOBILE_AGENT_RE=re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            template_name = "mob_" + template_name
        return template_name

    def get_settings_template(self, folder, template, request):
        import re

        if request.user.pk == self.pk:
            template_name = folder + template
        else:
            raise PermissionDenied('Ошибка доступа.')
        MOBILE_AGENT_RE=re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
        if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
            template_name = "mob_" + template_name
        return template_name

    def unfavorite_community_with_name(self, community_name):
        from communities.models import Community

        check_can_unfavorite_community_with_name(user=self, community_name=community_name)
        community_to_unfavorite = Community.objects.get(name=community_name)
        self.favorite_communities.remove(community_to_unfavorite)
        return community_to_unfavorite

    def join_community_with_name(self, community_name):
        from communities.models import Community
        from follows.models import CommunityFollow
        from invitations.models import CommunityInvite

        check_can_join_community_with_name(user=self, community_name=community_name)
        community_to_join = Community.objects.get(name=community_name)
        community_to_join.add_member(self)
        if community_to_join.is_private():
            CommunityInvite.objects.filter(community_name=community_name, invited_user__id=self.id).delete()
        elif community_to_join.is_closed():
            CommunityFollow.objects.filter(community__name=community_name, user__id=self.id).delete()
        return community_to_join

    def leave_community_with_name(self, community_name):
        from communities.models import Community

        check_can_leave_community_with_name(user=self, community_name=community_name)
        community_to_leave = Community.objects.get(name=community_name)
        if self.has_favorite_community_with_name(community_name):
            self.unfavorite_community_with_name(community_name=community_name)
        community_to_leave.remove_member(self)
        return community_to_leave

    def _make_get_votes_query(self, item):
        reactions_query = Q(parent_id=item.pk)
        post_community = item.community
        if post_community:
            if not self.is_staff_of_community_with_name(community_name=post_community.name):
                blocked_users_query = ~Q(Q(user__blocked_by_users__blocker_id=self.pk) | Q(user__user_blocks__blocked_user_id=self.pk))
                blocked_users_query_staff_members = Q(user__communities_memberships__community_id=post_community.pk)
                blocked_users_query_staff_members.add(Q(user__communities_memberships__is_administrator=True) | Q(user__communities_memberships__is_moderator=True), Q.AND)
                blocked_users_query.add(~blocked_users_query_staff_members, Q.AND)
                reactions_query.add(blocked_users_query, Q.AND)
        else:
            blocked_users_query = ~Q(Q(user__blocked_by_users__blocker_id=self.pk) | Q(user__user_blocks__blocked_user_id=self.pk))
            reactions_query.add(blocked_users_query, Q.AND)
        return reactions_query

    def _make_get_votes_query_comment(self, comment):
        reactions_query = Q(item_id=comment.pk)
        try:
            post_community = comment.item.community
        except:
            post_community = comment.parent_comment.item.community
        if post_community:
            if not self.is_staff_of_community_with_name(community_name=post_community.name):
                blocked_users_query = ~Q(Q(user__blocked_by_users__blocker_id=self.pk) | Q(user__user_blocks__blocked_user_id=self.pk))
                blocked_users_query_staff_members = Q(user__communities_memberships__community_id=post_community.pk)
                blocked_users_query_staff_members.add(Q(user__communities_memberships__is_administrator=True) | Q(user__communities_memberships__is_moderator=True), Q.AND)
                blocked_users_query.add(~blocked_users_query_staff_members, Q.AND)
                reactions_query.add(blocked_users_query, Q.AND)
        else:
            blocked_users_query = ~Q(Q(user__blocked_by_users__blocker_id=self.pk) | Q(user__user_blocks__blocked_user_id=self.pk))
            reactions_query.add(blocked_users_query, Q.AND)
        return reactions_query

    def has_favorite_community_with_name(self, community_name):
        return self.favorite_communities.filter(name=community_name).exists()

    def has_excluded_community_with_name(self, community_name):
        return self.top_posts_community_exclusions.filter(community__name=community_name).exists()

    def has_blocked_user_with_id(self, user_id):
        return self.user_blocks.filter(blocked_user_id=user_id).exists()

    def get_last_location(self):
        if self.user_ip.ip_3:
            loc = self.user_location_3
        elif self.user_ip.ip_2:
            loc = self.user_location_2
        elif self.user_ip.ip_1:
            loc = self.user_location
        return loc

    @classmethod
    def get_user_visiter_order_by(cls, query):
        from django.db.models import Count

        return cls.objects.filter(query).order_by('visitor_user__count')

    def get_visited_for_user(self):
        from stst.models import UserNumbers

        v_s = UserNumbers.objects.filter(target=self.pk).values('visitor')
        query = Q(id__in=v_s)
        visitors = User.objects.filter(query).order_by("pk")
        return visitors

    def get_unical_visited_for_user(self):
        from stst.models import UserNumbers

        return UserNumbers.objects.filter(target=self.pk).values('pk').count()

    def get_all_visited_for_user(self):
        from stst.models import UserNumbers

        try:
            v_s = UserNumbers.objects.filter(target=self.pk).values('count')
            total = 0
            visiter_ids = [count['count'] for count in v_s]
            for sum in visiter_ids:
                total += sum
            return total
        except:
            pass

    def get_count_visitor_for_user(self,user_id):
        from stst.models import UserNumbers
        try:
            link = UserNumbers.objects.get(visitor=self.pk, target=user_id)
            return link.count
        except:
            pass

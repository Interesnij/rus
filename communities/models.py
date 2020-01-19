import uuid
from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils import timezone
from django.db.models import Q
from django.db.models import Count
from pilkit.processors import ResizeToFill, ResizeToFit
from communities.helpers import upload_to_community_avatar_directory, upload_to_community_cover_directory
from imagekit.models import ProcessedImageField
from moderation.models import ModeratedObject, ModerationCategory
from main.models import Item
from goods.models import Good
from common.model_loaders import get_user_model
from notifications.model.user import *
from gallery.models import Album, Photo
from music.models import SoundList


class CommunityCategory(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False, verbose_name="Название")
    avatar = models.ImageField(blank=False, null=True, verbose_name="Аватар")
    order = models.IntegerField(default=0, verbose_name="Номер")

    def __str__(self):
        return 'Категория: ' + self.name

    class Meta:
        verbose_name="Категория сообществ"
        verbose_name_plural="Категории сообществ"


class CommunitySubCategory(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False, verbose_name="Название")
    sudcategory = models.ForeignKey(CommunityCategory, on_delete=models.CASCADE, related_name='community_categories', verbose_name="Подкатегория сообщества")
    avatar = models.ImageField(blank=False, null=True, verbose_name="Аватар")
    order = models.IntegerField(default=0, verbose_name="Номер")

    def __str__(self):
        return 'ПодКатегория: ' + self.name

    class Meta:
        verbose_name="Подкатегория сообществ"
        verbose_name_plural="Подкатегории сообществ"


class Community(models.Model):
    moderated_object = GenericRelation(ModeratedObject, related_query_name='communities',verbose_name="Модерация")
    category = models.ForeignKey(CommunitySubCategory, on_delete=models.CASCADE, related_name='community_sub_categories', verbose_name="Подкатегория сообщества")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_communities', null=False, blank=False, verbose_name="Создатель")
    name = models.CharField(max_length=100, blank=False, null=False, verbose_name="Название" )
    description = models.TextField(max_length=500, blank=True, null=True, verbose_name="Описание" )
    rules = models.TextField(max_length=1000, blank=True, null=True, verbose_name="Правила")
    cover = ProcessedImageField(blank=True, format='JPEG',options={'quality': 90},upload_to=upload_to_community_avatar_directory,processors=[ResizeToFit(width=1024, upscale=False)])
    created = models.DateTimeField(default=timezone.now, editable=False, verbose_name="Создано")
    starrers = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='favorite_communities', verbose_name="Подписчики")
    banned_users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='banned_of_communities', verbose_name="Черный список")
    status = models.CharField(max_length=100, blank=True, verbose_name="статус-слоган")
    COMMUNITY_TYPE_PRIVATE = 'T'
    COMMUNITY_TYPE_PUBLIC = 'P'
    COMMUNITY_TYPE_CLOSED = 'C'
    COMMUNITY_TYPES = (
        (COMMUNITY_TYPE_PUBLIC, 'Публичное'),
        (COMMUNITY_TYPE_PRIVATE, 'Приватное'),
        (COMMUNITY_TYPE_CLOSED, 'Закрытое'),
    )
    type = models.CharField(choices=COMMUNITY_TYPES, default='P', max_length=2)
    invites_enabled = models.BooleanField(default=True, verbose_name="Разрешить приглашения")
    is_deleted = models.BooleanField(default=False,verbose_name="Удаленное")
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="uuid")

    class Meta:
        verbose_name = 'сообщество'
        verbose_name_plural = 'сообщества'

    @classmethod
    def create_community(cls, name, category, creator, type, description=None, rules=None, invites_enabled=None):
        if type is Community.COMMUNITY_TYPE_PRIVATE and invites_enabled is None:
            invites_enabled = False
        else:
            invites_enabled = True
        community = cls.objects.create(name=name, creator=creator, description=description, type=type, rules=rules,invites_enabled=invites_enabled, category=category)
        CommunityMembership.create_membership(user=creator, is_administrator=True, is_moderator=False,community=community)
        community.save()
        Album.objects.create(creator=creator, community=community, title="Сохраненные фото", is_generic=True,)
        Album.objects.create(creator=creator, community=community, title="Фото со стены", is_generic=True,)
        Album.objects.create(creator=creator, community=community, title="Фото со страницы", is_generic=True,)
        SoundList.objects.create(creator=user, community=community, name="my_first_generic_playlist_number_12345678900000000",)

        CommunityNotificationsSettings.objects.create(community=community)
        CommunityPrivateSettings.objects.create(community=community)
        return community

    @classmethod
    def is_user_with_username_member_of_community_with_name(cls, username, community_name):
        return cls.objects.filter(name=community_name, memberships__user__username=username).exists()

    @classmethod
    def is_user_with_username_administrator_of_community_with_name(cls, user_id, community_name):
        return cls.objects.filter(name=community_name, memberships__user__id=user_id,
                                  memberships__is_administrator=True).exists()

    @classmethod
    def is_user_with_username_moderator_of_community_with_name(cls, username, community_name):
        return cls.objects.filter(name=community_name, memberships__user__username=username,
                                  memberships__is_moderator=True).exists()

    @classmethod
    def is_user_with_username_banned_from_community_with_name(cls, username, community_name):
        return cls.objects.filter(name=community_name, banned_users__username=username).exists()

    @classmethod
    def is_community_with_name_invites_enabled(cls, community_name):
        return cls.objects.filter(name=community_name, invites_enabled=True).exists()

    @classmethod
    def is_community_with_name_private(cls, community_name):
        return cls.objects.filter(name=community_name, type='T').exists()

    @classmethod
    def is_community_with_name_closed(cls, community_name):
        return cls.objects.filter(name=community_name, type='C').exists()

    @classmethod
    def get_community_with_name_for_user_with_id(cls, community_name, user_id):
        query = Q(name=community_name, is_deleted=False)
        query.add(~Q(banned_users__id=user_id), Q.AND)
        return cls.objects.get(query)

    @classmethod
    def search_communities_with_query(cls, query):
        query = cls._make_search_communities_query(query=query)
        return cls.objects.filter(query)

    @classmethod
    def _make_search_communities_query(cls, query):
        communities_query = Q(name__icontains=query)
        communities_query.add(Q(title__icontains=query), Q.OR)
        communities_query.add(Q(is_deleted=False), Q.AND)
        return communities_query

    @classmethod
    def get_trending_communities_for_user_with_id(cls, user_id, category_name=None):
        trending_communities_query = cls._make_trending_communities_query(category_name=category_name)
        trending_communities_query.add(~Q(banned_users__id=user_id), Q.AND)
        return cls._get_trending_communities_with_query(query=trending_communities_query)

    def get_posts(self):
        posts_query = Q(community_id=self.pk, is_deleted=False, is_fixed=False, status=Item.STATUS_PUBLISHED)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        posts_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        items = Item.objects.filter(posts_query)
        return items
    def get_draft_posts(self):
        posts_query = Q(community_id=self.pk, is_deleted=False, is_fixed=False, status=Item.STATUS_DRAFT)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        posts_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        items = Item.objects.filter(posts_query)
        return items
    def get_archive_posts(self):
        posts_query = Q(community_id=self.pk, is_deleted=False, is_fixed=False, status=Item.STATUS_ARHIVED)
        exclude_reported_and_approved_posts_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        posts_query.add(exclude_reported_and_approved_posts_query, Q.AND)
        items = Item.objects.filter(posts_query)
        return items

    def get_goods(self):
        goods_query = Q(community_id=self.pk, is_deleted=False, status=Good.STATUS_PUBLISHED)
        exclude_reported_and_approved_goods_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        goods_query.add(exclude_reported_and_approved_goods_query, Q.AND)
        goods = Good.objects.filter(goods_query)
        return goods
    def get_admin_goods(self):
        goods_query = Q(community_id=self.pk, is_deleted=False)
        exclude_reported_and_approved_goods_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        goods_query.add(exclude_reported_and_approved_goods_query, Q.AND)
        goods = Good.objects.filter(goods_query)
        return goods

    def get_photos_for_album(self, album_id):
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        try:
            photos_query = Q(is_deleted=False, album_2_id=album_id, is_public=True)
        except:
            photos_query = Q(is_deleted=False, album_id=album_id, is_public=True)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos
    def get_photos_for_admin_album(self, album_id):
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        try:
            photos_query = Q(is_deleted=False, album_2_id=album_id)
        except:
            photos_query = Q(is_deleted=False, album_id=album_id)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos

    def get_photos(self):
        photos_query = Q(is_deleted=False, is_public=True, community=self)
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos
    def get_admin_photos(self):
        photos_query = Q(is_deleted=False, community=self)
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        photos = Photo.objects.filter(photos_query)
        return photos

    def get_avatar_photos(self):
        photos_query = Q(is_deleted=False, community=self, album_2__title="Фото со страницы", album_2__is_generic=True)
        exclude_reported_and_approved_photos_query = ~Q(moderated_object__status=ModeratedObject.STATUS_APPROVED)
        photos_query.add(exclude_reported_and_approved_photos_query, Q.AND)
        avatar_photos = Photo.objects.filter(photos_query)
        return avatar_photos

    def get_avatar(self):
        try:
            avatar = self.get_avatar_photos().order_by('-id')[0]
        except:
            avatar = None
        return avatar

    @classmethod
    def get_trending_communities(cls, category_name=None):
        trending_communities_query = cls._make_trending_communities_query(category_name=category_name)
        return cls._get_trending_communities_with_query(query=trending_communities_query)

    @classmethod
    def _get_trending_communities_with_query(cls, query):
        return cls.objects.annotate(Count('memberships')).filter(query).order_by('-memberships__count', '-created')

    @classmethod
    def _make_trending_communities_query(cls, category_name=None):
        trending_communities_query = Q(is_deleted=False)
        if category_name:
            trending_communities_query.add(Q(categories__name=category_name), Q.AND)
        return trending_communities_query


    @classmethod
    def get_community_with_name_members(cls, community_name):
        community_members_query = Q(communities_memberships__community__name=community_name)
        User = get_user_model()
        return User.objects.filter(community_members_query)

    @classmethod
    def get_community_with_name_administrators(cls, community_name):
        community_administrators_query = Q(communities_memberships__community__name=community_name, communities_memberships__is_administrator=True)
        User = get_user_model()
        return User.objects.filter(community_administrators_query)

    @classmethod
    def get_community_with_name_moderatiors(cls, community_name):
        community_administrators_query = Q(communities_memberships__community__name=community_name, communities_memberships__is_moderatior=True)
        User = get_user_model()
        return User.objects.filter(community_administrators_query)

    @classmethod
    def get_community_with_name_creator(cls, community_id):
        community = Community.objects.get(pk=community_id)
        User = get_user_model()
        return User.objects.filter(id=community__creator__id)

    @classmethod
    def get_community_with_name_editors(cls, community_name):
        community_moderators_query = Q(communities_memberships__community__name=community_name, communities_memberships__is_editor=True)
        User = get_user_model()
        return User.objects.filter(community_moderators_query)

    @classmethod
    def get_community_with_name_advertisers(cls, community_name):
        community_moderators_query = Q(communities_memberships__community__name=community_name, communities_memberships__is_advertiser=True)
        User = get_user_model()
        return User.objects.filter(community_moderators_query)

    @classmethod
    def get_community_with_name_follows(cls, community_name):
        community_moderators_query = Q(communities_memberships__community__name=community_name, communities_memberships__is_moderator=True)
        User = get_user_model()
        return User.objects.filter(community_moderators_query)

    @classmethod
    def get_community_with_name_banned_users(cls, community_name):
        community = Community.objects.get(name=community_name)
        community_members_query = Q()
        return community.banned_users.filter(community_members_query)

    @classmethod
    def search_community_with_name_members(cls, community_name, query):
        db_query = Q(communities_memberships__community__name=community_name)
        community_members_query = Q(communities_memberships__user__username__icontains=query)
        community_members_query.add(Q(communities_memberships__user__profile__name__icontains=query), Q.OR)
        db_query.add(community_members_query, Q.AND)
        User = get_user_model()
        return User.objects.filter(db_query)

    @classmethod
    def search_community_with_name_moderators(cls, community_name, query):
        db_query = Q(communities_memberships__community__name=community_name, communities_memberships__is_moderator=True)
        community_members_query = Q(communities_memberships__user__username__icontains=query)
        community_members_query.add(Q(communities_memberships__user__profile__name__icontains=query), Q.OR)
        db_query.add(community_members_query, Q.AND)
        User = get_user_model()
        return User.objects.filter(db_query)

    @classmethod
    def search_community_with_name_administrators(cls, community_name, query):
        db_query = Q(communities_memberships__community__name=community_name, communities_memberships__is_administrator=True)
        community_members_query = Q(communities_memberships__user__username__icontains=query)
        community_members_query.add(Q(communities_memberships__user__profile__name__icontains=query), Q.OR)
        db_query.add(community_members_query, Q.AND)
        User = get_user_model()
        return User.objects.filter(db_query)

    @classmethod
    def search_community_with_name_banned_users(cls, community_name, query):
        community = Community.objects.get(name=community_name)
        community_banned_users_query = Q(username__icontains=query)
        community_banned_users_query.add(Q(profile__name__icontains=query), Q.OR)
        return community.banned_users.filter(community_banned_users_query)

    def get_staff_members(self):
        staff_members_query = Q(communities_memberships__community_id=self.pk)
        staff_members_query.add(Q(communities_memberships__is_administrator=True) | Q(communities_memberships__is_moderator=True), Q.AND)
        User = get_user_model()
        return User.objects.filter(staff_members_query)

    def is_private(self):
        return self.type is self.COMMUNITY_TYPE_PRIVATE

    def is_closed(self):
        return self.type is self.COMMUNITY_TYPE_CLOSED

    def is_public(self):
        return self.type is self.COMMUNITY_TYPE_PUBLIC

    def is_community_playlist(self, user):
        return user.usertempsoundlist.filter(user=self, tag=None, list__community__pk=self.pk).exists()

    def add_moderator(self, user):
        user_membership = self.memberships.get(user=user)
        user_membership.is_moderator = True
        user_membership.save()
        return user_membership

    def remove_moderator(self, user):
        user_membership = self.memberships.get(user=user)
        user_membership.is_moderator = False
        user_membership.save()
        return user_membership

    def add_administrator(self, user):
        user_membership = self.memberships.get(user=user)
        user_membership.is_administrator = True
        user_membership.save()
        return user_membership

    def remove_administrator(self, user):
        user_membership = self.memberships.get(user=user)
        user_membership.is_administrator = False
        user_membership.save()
        return user_membership

    def add_member(self, user):
        user_membership = CommunityMembership.create_membership(user=user, community=self)
        return user_membership

    def remove_member(self, user):
        user_membership = self.memberships.get(user=user)
        user_membership.delete()

    def notification_new_member(self, user):
        community_notification_handler(actor=user, recipient=None, verb=UserCommunityNotification.JOIN, community=self.community, key='notification')

    def create_invite(self, creator, invited_user):

        CommunityInvite = get_community_invite_model()
        return CommunityInvite.create_community_invite(creator=creator, invited_user=invited_user, community=self)

    def create_user_ban_log(self, source_user, target_user):
        return self._create_log(action_type='B', source_user=source_user, target_user=target_user)

    def create_user_unban_log(self, source_user, target_user):
        return self._create_log(action_type='U', source_user=source_user, target_user=target_user)

    def create_add_administrator_log(self, source_user, target_user):
        return self._create_log(action_type='AA', source_user=source_user, target_user=target_user)

    def create_remove_administrator_log(self, source_user, target_user):
        return self._create_log(action_type='RA', source_user=source_user, target_user=target_user)

    def create_add_moderator_log(self, source_user, target_user):
        return self._create_log(action_type='AM', source_user=source_user, target_user=target_user)

    def create_remove_moderator_log(self, source_user, target_user):
        return self._create_log(action_type='RM', source_user=source_user, target_user=target_user)

    def create_remove_post_log(self, source_user, target_user):
        return self._create_log(action_type='RP', source_user=source_user, target_user=target_user)

    def create_remove_post_comment_log(self, source_user, target_user):
        return self._create_log(action_type='RPC', source_user=source_user, target_user=target_user)

    def create_remove_post_comment_reply_log(self, source_user, target_user):
        return self._create_log(action_type='RPCR', source_user=source_user, target_user=target_user)

    def create_disable_post_comments_log(self, source_user, target_user, post):
        return self._create_log(action_type='DPC', post=post, source_user=source_user, target_user=target_user)

    def create_enable_post_comments_log(self, source_user, target_user, post):
        return self._create_log(action_type='EPC', post=post, source_user=source_user, target_user=target_user)

    def create_open_post_log(self, source_user, target_user, post):
        return self._create_log(action_type='OP', post=post, source_user=source_user, target_user=target_user)

    def create_close_post_log(self, source_user, target_user, post):
        return self._create_log(action_type='CP', post=post, source_user=source_user, target_user=target_user)

    def _create_log(self, action_type, source_user, target_user, post=None):
        return CommunityModeratorUserActionLog.create_community_log(community=self, post=post, target_user=target_user, action_type=action_type, source_user=source_user)

    def __str__(self):
        return self.name

    def count_members(self):
        return self.memberships.count()


class CommunityMembership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, db_index=False, on_delete=models.CASCADE, related_name='communities_memberships', null=False, blank=False, verbose_name="Члены сообщества")
    community = models.ForeignKey(Community, db_index=False, on_delete=models.CASCADE, related_name='memberships', null=False, blank=False, verbose_name="Сообщество")
    is_administrator = models.BooleanField(default=False, verbose_name="Это администратор")
    is_moderator = models.BooleanField(default=False, verbose_name="Это модератор")
    is_editor = models.BooleanField(default=False, verbose_name="Это редактор")
    is_advertiser = models.BooleanField(default=False, verbose_name="Это рекламодатель")
    created = models.DateTimeField(default=timezone.now, editable=False, verbose_name="Создано")

    def __str__(self):
        return self.user.get_full_name()

    @classmethod
    def create_membership(cls, user, community, is_administrator=False, is_moderator=False):
        membership = cls.objects.create(user=user, community=community, is_administrator=is_administrator,
                                        is_moderator=is_moderator)

        return membership

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(CommunityMembership, self).save(*args, **kwargs)

    class Meta:
        unique_together = (('user', 'community'),)
        indexes = [
            models.Index(fields=['community', 'user']),
            models.Index(fields=['community', 'user', 'is_administrator']),
            models.Index(fields=['community', 'user', 'is_moderator']),
            ]
        verbose_name = 'подписчик сообщества'
        verbose_name_plural = 'подписчики сообщества'


class CommunityLog(models.Model):
    source_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='+', null=False, blank=False, verbose_name="Кто модерирует")
    target_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='+', null=True, blank=False, verbose_name="Кого модерируют")
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='+', null=True, blank=True, verbose_name="Пост")
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='logs', null=False, blank=False, verbose_name="Сообщество")
    created = models.DateTimeField(default=timezone.now, editable=False, verbose_name="Создан")

    ACTION_TYPES = (
        ('B', 'Заблокировать'),
        ('U', 'Разблокировать'),
        ('AM', 'Добавить модератора'),
        ('RM', 'Удалить модератора'),
        ('AA', 'Добавить администратора'),
        ('RA', 'Удалить администратора'),
        ('OP', 'Открыть пост'),
        ('CP', 'Закрыть пост'),
        ('RP', 'Удалить пост'),
        ('RPC', 'Удалить комментарий к посту'),
        ('DPC', 'Отключить комментарии'),
        ('EPC', 'Включить комментарии'),
    )
    action_type = models.CharField(editable=False, blank=False, null=False, choices=ACTION_TYPES, max_length=5)

    @classmethod
    def create_community_log(cls, community, action_type, source_user, target_user, item=None):
        return cls.objects.create(community=community, action_type=action_type, source_user=source_user,
                                  target_user=target_user, item=item)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(CommunityLog, self).save(*args, **kwargs)


class CommunityInvite(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, db_index=False, on_delete=models.CASCADE, related_name='created_communities_invites', null=False,blank=False, verbose_name="Кто приглашает в сообщество")
    invited_user = models.ForeignKey(settings.AUTH_USER_MODEL, db_index=False, on_delete=models.CASCADE, related_name='communities_invites', null=False, blank=False, verbose_name="Кого приглашают в сообщество")
    community = models.ForeignKey(Community, db_index=False, on_delete=models.CASCADE, related_name='invites', null=False, blank=False, verbose_name="Сообщество")

    @classmethod
    def create_community_invite(cls, creator, invited_user, community):
        return cls.objects.create(creator=creator, invited_user=invited_user, community=community)

    @classmethod
    def is_user_with_username_invited_to_community_with_name(cls, username, community_name):
        return cls.objects.filter(community__name=community_name, invited_user__username=username).exists()

    class Meta:
        unique_together = (('invited_user', 'community', 'creator'),)
        verbose_name = 'Приглашение в сообщество'
        verbose_name_plural = 'Приглашения в сообщества'



class CommunityNotificationsSettings(models.Model):
    community = models.OneToOneField(Community, on_delete=models.CASCADE, related_name='community_notifications_settings', verbose_name="Сообщество")
    comment_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления о комментариях к записям")
    react_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления о реакциях к записи")
    comment_reply_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления об ответах на комментарии к записям")
    comment_reply_react_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления реакциях на ответы к комментариям")
    comment_react_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления о реакциях на комментарии к записям")
    connection_request_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления о заявках в сообщество")
    comment_user_mention_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления об упоминаниях в комментариях к записям")
    user_mention_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления об упоминаниях в записям")
    repost_notifications = models.BooleanField(default=True, verbose_name="Отправлять уведомления о репостах записей")

    @classmethod
    def create_notifications_settings(cls, user):
        return CommunityNotificationsSettings.objects.create(commynity=commynity)


class CommunityPrivateSettings(models.Model):
    community = models.OneToOneField(Community, on_delete=models.CASCADE, related_name='community_private_settings', verbose_name="Сообщество")
    photo_visible_all = models.BooleanField(default=True, verbose_name="Фото сообщества видны всем")
    photo_visible_member = models.BooleanField(default=True, verbose_name="Фото сообщества видны подписчикам")
    can_comments = models.BooleanField(default=True, verbose_name="Все могут оставлять комментарии все пользователи")
    can_add_post = models.BooleanField(default=False, verbose_name="Все могут писать записи на стене")
    can_add_article = models.BooleanField(default=False, verbose_name="Все могут писать статьи на стене")
    can_add_good = models.BooleanField(default=False, verbose_name="Все могут добавлять товары")

    @classmethod
    def create_private_settings(cls, user):
        return CommunityPrivateSettings.objects.create(commynity=commynity)

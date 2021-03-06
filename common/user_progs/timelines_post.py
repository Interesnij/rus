from django.db.models import Q
from posts.models import Post
from gallery.models import Photo, Album
from goods.models import Good
from video.models import VideoAlbum
from music.models import SoundList


def get_timeline_posts(user):
    """ лента записей, которые публикуются друзьями, источниками подписки, сообществами пользователя """
    select_related = ('creator', 'community')
    only = ('creator__id', 'community__id', 'created')
    my_posts = user.post_creator.select_related(*select_related).only(*only).filter(creator_id=user.pk, community__isnull=True, is_deleted=False, status="P")

    _community_posts = Q(community__memberships__user__id=user.pk, is_deleted=False, status="P")
    _community_posts.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk) |Q(list__type="DE") |Q(list__type="PR")), Q.AND)
    community_posts = Post.objects.select_related(*select_related).only(*only).filter(_community_posts)

    followeds = user.follows.values('followed_user_id')
    _followed_users = Q(creator_id__in=[i['followed_user_id'] for i in followeds], creator__user_private__is_private=False, is_deleted=False, status=Post.STATUS_PUBLISHED)
    _followed_users.add(~Q(Q(list__type="DE") |Q(list__type="PR")), Q.AND)
    followed_users = Post.objects.select_related(*select_related).only(*only).filter(_followed_users)

    frends = user.connections.values('target_user_id')
    _frends_query = Q(creator_id__in=[i['target_user_id'] for i in frends], is_deleted=False, status="P")
    _frends_query.add(~Q(Q(list__type="DE") |Q(list__type="PR")), Q.AND)
    frends = Post.objects.select_related(*select_related).only(*only).filter(_frends_query)
    return my_posts.union(community_posts, followed_users, frends)

def get_timeline_featured_posts(user):
    """ лента записей, которые публикуются рекомендованнными для пользователя пользователями, их сообществами """
    possible_users = user.get_possible_friends_ids()
    posts_query = Q(creator_id__in=possible_users, creator__user_private__is_private=False, community__isnull=True, is_deleted=False, status=Post.STATUS_PUBLISHED)
    posts_query.add(~Q(Q(list__type="DE") |Q(list__type="PR")), Q.AND)
    posts_queryset = Post.objects.only('created').filter(posts_query)
    community_query = Q(community__memberships__user__id__in=possible_users, is_deleted=False, status=Post.STATUS_PUBLISHED)
    community_query.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk) | Q(list__type="DE") | Q(list__type="PR")), Q.AND)
    community_queryset = Post.objects.only('created').filter(community_query)
    return posts_queryset.union(community_queryset)


def get_timeline_photos(user):
    """ лента фотоальбомов с последними фотографиями, которые публикуются друзьями, источниками подписки, сообществами пользователя """
    own_albums_query = Q(creator_id=user.pk, community__isnull=True, is_deleted=False, is_public=True, photo_album__isnull=False)
    own_albums_queryset = user.photo_album_creator.only('created').filter(own_albums_query)

    community_albums_query = Q(community__memberships__user__id=user.pk, is_deleted=False, is_public=True, photo_album__isnull=False)
    community_albums_query.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk)), Q.AND)
    community_albums_queryset = Album.objects.only('created').filter(community_albums_query)

    followed_users = user.follows.values('followed_user_id')
    followed_users_ids = [followed_user['followed_user_id'] for followed_user in followed_users]
    followed_users_query = Q(creator__in=followed_users_ids, creator__user_private__is_private=False, is_deleted=False, is_public=True, photo_album__isnull=False)
    community_albums_query.add(~Q(followed_users_query), Q.AND)
    followed_users_queryset = Album.objects.only('created').filter(followed_users_query)

    frends = user.connections.values('target_user_id')
    frends_ids = [target_user['target_user_id'] for target_user in frends]
    frends_query = Q(creator__in=frends_ids, is_deleted=False, is_public=True, photo_album__isnull=False)
    frends_query.add(~Q(followed_users_query), Q.AND)
    frends_queryset = Album.objects.only('created').filter(frends_query)
    final_queryset = own_albums_queryset.union(community_albums_queryset, followed_users_queryset, frends_queryset).order_by("-created")
    return final_queryset

def get_timeline_featured_photos(user):
    """ лента фотоальбомов с последними фотографиями, которые публикуются рекомендованнными для пользователя пользователями, их сообществами """
    possible_users = user.get_possible_friends_ids()
    albums_query = Q(creator_id__in=possible_users, community__isnull=True, is_deleted=False, is_public=True, photo_album__isnull=False)
    albums_queryset = Album.objects.only('created').filter(albums_query)
    community_query = Q(community__memberships__user__id__in=possible_users, is_deleted=False, is_public=True)
    community_query.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk)), Q.AND)
    community_queryset = Album.objects.only('created').filter(community_query)
    final_queryset = albums_queryset.union(community_queryset).order_by("-created")
    return final_queryset


def get_timeline_goods(user):
    """ лента товаров, которые публикуются друзьями, источниками подписки, сообществами пользователя """
    own_goods_query = Q(creator_id=user.pk, is_deleted=False, status=Good.STATUS_PUBLISHED)
    own_goods_queryset = user.good_creator.only('created').filter(own_goods_query)

    followed_users = user.follows.values('followed_user_id')
    followed_users_ids = [followed_user['followed_user_id'] for followed_user in followed_users]
    followed_users_query = Q(creator__in=followed_users_ids, creator__user_private__is_private=False, is_deleted=False, status=Good.STATUS_PUBLISHED)
    followed_users_queryset = Good.objects.only('created').filter(followed_users_query)

    frends = user.connections.values('target_user_id')
    frends_ids = [target_user['target_user_id'] for target_user in frends]
    frends_query = Q(creator__in=frends_ids, is_deleted=False, status=Good.STATUS_PUBLISHED)
    frends_queryset = Good.objects.only('created').filter(frends_query)
    final_queryset = own_goods_queryset.union(followed_users_queryset, frends_queryset).order_by("-created")
    return final_queryset

def get_timeline_featured_goods(user):
    """ лента товаров, которые публикуются рекомендованнными для пользователя пользователями, их сообществами """
    possible_users = user.get_possible_friends_ids()
    goods_query = Q(creator_id__in=possible_users, is_deleted=False, status=Good.STATUS_PUBLISHED)
    goods_queryset = Good.objects.only('created').filter(goods_query)
    return goods_queryset


def get_timeline_videos(user):
    """ лента видеоальбомов с последними роликами, которые публикуются друзьями, источниками подписки, сообществами пользователя """
    empty_list_exclude = Q(video_album__isnull=True)
    own_videos_query = Q(creator_id=user.pk, community__isnull=True, is_deleted=False, is_public=True)
    own_videos_query.add(~Q(empty_list_exclude), Q.AND)
    own_videos_queryset = user.video_user_creator.only('id').filter(own_videos_query)

    community_videos_query = Q(community__memberships__user__id=user.pk, is_deleted=False, is_public=True)
    community_videos_query.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk)), Q.AND)
    community_videos_query.add(~Q(empty_list_exclude), Q.AND)
    community_videos_queryset = VideoAlbum.objects.only('id').filter(community_videos_query)

    followed_users = user.follows.values('followed_user_id')
    followed_users_ids = [followed_user['followed_user_id'] for followed_user in followed_users]
    followed_users_query = Q(creator__in=followed_users_ids, creator__user_private__is_private=False, is_deleted=False, is_public=True)
    followed_users_query.add(~Q(empty_list_exclude), Q.AND)
    followed_users_queryset = VideoAlbum.objects.only('id').filter(followed_users_query)

    frends = user.connections.values('target_user_id')
    frends_ids = [target_user['target_user_id'] for target_user in frends]
    frends_query = Q(creator__in=frends_ids, is_deleted=False, is_public=True)
    frends_query.add(~Q(empty_list_exclude), Q.AND)
    frends_queryset = VideoAlbum.objects.only('id').filter(frends_query)
    final_queryset = own_videos_queryset.union(community_videos_queryset, followed_users_queryset, frends_queryset).order_by("-id")
    return final_queryset

def get_timeline_featured_videos(user):
    """ лента видеоальбомов с последними роликами, которые публикуются рекомендованнными для пользователя пользователями, их сообществами """
    possible_users = user.get_possible_friends_ids()
    empty_list_exclude = Q(video_album__isnull=True)
    videos_query = Q(creator_id__in=possible_users, community__isnull=True, is_deleted=False, is_public=True)
    videos_query.add(~Q(empty_list_exclude), Q.AND)
    videos_queryset = VideoAlbum.objects.only('id').filter(videos_query)
    community_query = Q(community__memberships__user__id__in=possible_users, is_deleted=False, is_public=True)
    community_query.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk)), Q.AND)
    community_query.add(~Q(empty_list_exclude), Q.AND)
    community_queryset = VideoAlbum.objects.only('id').filter(community_query)
    final_queryset = videos_queryset.union(community_queryset).order_by("-id")
    return final_queryset


def get_timeline_audios(user):
    """ лента плейлистов с последними треками, которые публикуются друзьями, источниками подписки, сообществами пользователя """
    empty_list_exclude = Q(players__isnull=True)
    own_audios_query = Q(creator_id=user.pk, community__isnull=True, is_deleted=False)
    own_audios_query.add(~Q(empty_list_exclude), Q.AND)
    own_audios_queryset = user.user_playlist.only('id').filter(own_audios_query)

    community_audios_query = Q(community__memberships__user__id=user.pk, is_deleted=False)
    community_audios_query.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk)), Q.AND)
    community_audios_query.add(~Q(empty_list_exclude), Q.AND)
    community_audios_queryset = SoundList.objects.only('id').filter(community_audios_query)

    followed_users = user.follows.values('followed_user_id')
    followed_users_ids = [followed_user['followed_user_id'] for followed_user in followed_users]
    followed_users_query = Q(creator__in=followed_users_ids, creator__user_private__is_private=False, is_deleted=False)
    followed_users_query.add(~Q(empty_list_exclude), Q.AND)
    followed_users_queryset = SoundList.objects.only('id').filter(followed_users_query)

    frends = user.connections.values('target_user_id')
    frends_ids = [target_user['target_user_id'] for target_user in frends]
    frends_query = Q(creator__in=frends_ids, is_deleted=False)
    frends_query.add(~Q(empty_list_exclude), Q.AND)
    frends_queryset = SoundList.objects.only('id').filter(frends_query)
    final_queryset = own_audios_queryset.union(community_audios_queryset, followed_users_queryset, frends_queryset).order_by("-id")
    return final_queryset

def get_timeline_featured_audios(user):
    """ лента плейлистов с последними треками, которые публикуются рекомендованнными для пользователя пользователями, их сообществами """
    possible_users = user.get_possible_friends_ids()
    empty_list_exclude = Q(players__isnull=True)
    audios_query = Q(creator_id__in=possible_users, community__isnull=True, is_deleted=False)
    audios_query.add(~Q(empty_list_exclude), Q.AND)
    audios_queryset = SoundList.objects.only('id').filter(audios_query)
    community_query = Q(community__memberships__user__id__in=possible_users, is_deleted=False)
    community_query.add(~Q(Q(creator__blocked_by_users__blocker_id=user.pk) | Q(creator__user_blocks__blocked_user_id=user.pk)), Q.AND)
    community_query.add(~Q(empty_list_exclude), Q.AND)
    community_queryset = SoundList.objects.only('id').filter(community_query)
    final_queryset = audios_queryset.union(community_queryset).order_by("-id")
    return final_queryset

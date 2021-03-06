from django import template
register=template.Library()


@register.filter
def is_track_exists(user, track_id):
    if user.is_track_exists(track_id):
        return True
    else:
        return False

@register.filter
def is_user_list(user, list):
    if user.is_user_temp_list(list):
        return True
    else:
        return False


@register.filter
def track_in_list(list, track_id):
    if list.is_track_in_list(track_id):
        return True
    else:
        return False

@register.filter
def is_user_can_add_playlist(list, user_id):
    if list.is_user_can_add_list(user_id):
        return True
    else:
        return False

@register.filter
def is_user_can_add_list(list, user_id):
    if list.is_user_can_add_list(user_id):
        return True
    else:
        return False


@register.filter
def doc_in_list(list, doc_id):
    if list.is_doc_in_list(doc_id):
        return True
    else:
        return False

@register.filter
def photo_in_album(album, photo_id):
    if album.is_photo_in_album(photo_id):
        return True
    else:
        return False

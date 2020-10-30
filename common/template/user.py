import re
MOBILE_AGENT_RE = re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)

from rest_framework.exceptions import PermissionDenied
from common.check.user import check_user_can_get_list, check_anon_user_can_get_list
from common.check.community import check_can_get_lists, check_anon_can_get_list
from users.model.list import UserPopulateFriend


def get_template_user(user, folder, template, request_user):
    if request_user.is_authenticated:
        if request_user.is_no_phone_verified():
            template_name = "main/phone_verification.html"
        elif user.pk == request_user.pk:
            if user.is_suspended():
                template_name = "generic/u_template/you_suspended.html"
            elif user.is_blocked():
                template_name = "generic/u_template/you_global_block.html"
            else:
                template_name = folder + "my_" + template
        elif request_user.pk != user.pk:
            if user.is_suspended():
                template_name = "generic/u_template/user_suspended.html"
            elif user.is_blocked():
                template_name = "generic/u_template/user_global_block.html"
            elif request_user.is_manager() or request_user.is_superuser:
                template_name = folder + "staff_" + template
                request_user.create_or_plus_populate_friend(user.pk)
            elif request_user.is_blocked_with_user_with_id(user_id=user.pk):
                template_name = "generic/u_template/block_user.html"
            elif request_user.is_connected_with_user_with_id(user_id=user.pk):
                template_name = folder + template
                request_user.create_or_plus_populate_friend(user.pk)
            elif user.is_closed_profile():
                if request_user.is_followers_user_with_id(user_id=user.pk) or request_user.is_connected_with_user_with_id(user_id=user.pk):
                    template_name = folder + template
                else:
                    template_name = "generic/u_template/close_user.html"
            elif request_user.is_child() and not user.is_child_safety():
                template_name = "generic/u_template/no_child_safety.html"
            else:
                template_name = folder + template
    elif request_user.is_anonymous:
        if user.is_suspended():
            template_name = "generic/u_template/anon_user_suspended.html"
        elif user.is_blocked():
            template_name = "generic/u_template/anon_user_global_block.html"
        elif user.is_closed_profile():
            template_name = "generic/u_template/anon_close_user.html"
        elif not user.is_child_safety():
            template_name = "generic/u_template/anon_no_child_safety.html"
        else:
            template_name = folder + "anon_" + template
    return template_name

def get_settings_template(template, request_user, user_agent):
    if request_user.is_authenticated:
        if request_user.is_no_phone_verified():
            template_name = "main/phone_verification.html"
        elif request_user.is_suspended():
            template_name = "generic/u_template/you_suspended.html"
        elif request_user.is_blocked():
            template_name = "generic/u_template/you_global_block.html"
        else:
            template_name = template
        if MOBILE_AGENT_RE.match(user_agent):
            template_name = "mobile/" + template_name
        else:
            template_name = "desctop/" + template_name
    elif request_user.is_anonymous:
        raise PermissionDenied("Ошибка доступа")
    return template_name


def get_default_template(folder, template, request):
    if request.user.is_authenticated:
        template_name = folder + template
    elif request.user.is_anonymous:
        template_name = folder + "anon_" + template

    if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
        template_name = "mob_" + template_name
    return template_name

def get_detect_platform_template(template, request_user, user_agent):
    if request_user.is_authenticated:
        template_name = folder + template
    elif request_user.is_anonymous:
        raise PermissionDenied("Ошибка доступа")

    if MOBILE_AGENT_RE.match(user_agent):
        template_name = "mobile/" + template_name
    else:
        template_name = "desctop/" + template_name
    return template_name

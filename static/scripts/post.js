/*!
   item post scripts for user
  */
$('.user_page').on('click', '#form_post_btn', function() {
  pk = $(this).data('pk');
  form_post = $('#form_post');
  stream = form_post.parent().next();
  $.ajax({type: form_post.attr('method'),
  url: "/posts/add_post/" + pk + "/",
  data: form_post.serialize(),
  success: function(data) {
    stream.find(".lenta-container").prepend(data);
    stream.find(".post_empty").hide();
    $(".id_text").val("");
    $(".add_board #for_images_upload").hide();
    $(".add_board #for_gallery").hide();
    $(".add_board #for_doc").hide();
    $(".add_board #for_good").hide();
    $(".add_board #for_question").hide();
    $(".add_board #for_settings").hide();
    }
  });
  return false;
});

$('body').on('click', '.u_itemComment', function() {button1 = $(this);form1 = button1.parent().parent().parent();upload_block = form1.find(".upload_block");$.ajax({url: '/user/post-comment/', data: new FormData($(form1)[0]),contentType:false,cache:false,processData:false,type:'POST',success:function(data){ $(".form-control-rounded").val(""); form1.parent().prev().append(data); upload_block.empty()},error: function(data) { $.toast({heading: 'Ошибка',text: 'Для публикации комментария нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition: 'fade',icon: 'error'}); },});return false;});
$('body').on('click', '.u_replyComment', function() {button = $(this);form2 = button.parent().parent().parent().parent();block = form2.parent();upload_block = form2.find(".upload_block");reply_stream = block.next().next();pk = button.data('pk');uuid = button.data('uuid');$.ajax({url: '/user/reply-comment/' + uuid + "/" + pk + "/", data: new FormData($(form2)[0]), contentType: false, cache: false, processData: false, type: 'POST',success: function(data) { $(".form-control-rounded").val(""); reply_stream.append(data); reply_stream.addClass("replies_open"); block.hide(); upload_block.empty(); },error: function(data) { $.toast({heading: 'Ошибка',text: 'Для публикации ответа нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition:'fade',icon:'error'})},});return false;});
$('body').on('click', '.u_replyParentComment', function() {button = $(this);form3 = button.parent().parent().parent().parent();block = form3.parent();upload_block = form3.find(".upload_block");pk = button.data('pk');uuid = button.data('uuid');reply_stream = block.parents('.stream_reply_comments');$.ajax({url: '/user/reply-comment/' + uuid + "/" + pk + "/",data: new FormData($(form3)[0]),contentType: false,cache: false,processData: false,type: 'POST',success: function(data) { $(".form-control-rounded").val(""); reply_stream.append(data); block.hide(); upload_block.empty();},error: function(data) { $.toast({heading: 'Ошибка',text: 'Для публикации ответа нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition: 'fade',icon: 'error'}) },});return false;});

$('body').on('click', '.item_user_remove', function() {remove = $(this);uuid = remove.parents(".infinite-item").attr("item-id");$.ajax({url: "/user/delete/" + uuid + "/",success: function(data) {$(remove).parents('.card').hide();$('.activefullscreen').hide();$.toast({heading: 'Информация',text: 'Запись успешно удалена!',showHideTransition: 'fade',icon: 'info'})}});});
$('body').on('click', '.item_user_fixed', function() {fixed = $(this);uuid = fixed.parents(".infinite-item").attr("item-id");$.ajax({url: "/user/fixed/" + uuid + "/",success: function(data) {fixed.parent().html("<span class='dropdown-item item_user_unfixed'>Открепить</span>");$.toast({heading: 'Информация',text: 'Запись закреплена!',showHideTransition: 'fade',icon: 'info'})}});});
$('body').on('click', '.item_user_unfixed', function() {unfixed = $(this);uuid = unfixed.parents(".infinite-item").attr("item-id");$.ajax({url: "/user/unfixed/" + uuid + "/",success: function(data) {unfixed.parent().html("<span class='dropdown-item item_user_fixed'>Закрепить</span>");$.toast({heading: 'Информация',text: 'Запись откреплена!',showHideTransition: 'fade',icon: 'info'})}});});
$('body').on('click', '.item_user_off_comment', function() {off = $(this);uuid = off.parents(".infinite-item").attr("item-id");$.ajax({url: "/user/off_comment/" + uuid + "/",success: function(data) {off.parent().html("<span class='dropdown-item item_user_on_comment'>Включить комментарии</span>");$.toast({heading: 'Информация',text: 'Комментарии выключены!',showHideTransition: 'fade',icon: 'info'})}});});
$('body').on('click', '.item_user_on_comment', function() {on = $(this);uuid = on.parents(".infinite-item").attr("item-id");$.ajax({url: "/user/on_comment/" + uuid + "/",success: function(data) {on.parent().html("<span class='dropdown-item item_user_off_comment'>Выключить комментарии</span>");$.toast({heading: 'Информация',text: 'Комментарии включены!',showHideTransition: 'fade',icon: 'info'})}});});


/*!
   item post scripts for community
  */
$('body').on('click', '.member_follow_create', function() {member_follow_create = $(this);pk = member_follow_create.data('id');$.ajax({url: "/follows/add_member/" + pk + "/", success: function () {$('#ajax').html('').load("/communities/reload/" + pk + "/");}});});
$('body').on('click', '.member_follow_delete', function() {member_follow_delete = $(this);pk = member_follow_delete.data('id');uuid = member_follow_delete.data('uuid');$.ajax({url: "/follows/delete_member/" + pk + "/" + uuid + "/",success: function () {$('#ajax').html('').load("/communities/reload/" + pk + "/");}});});
$('body').on('click', '.community_member_delete', function() {member_delete = $(this);li = member_delete.parents(".list-group-item");pk = li.data('pk');uuid = li.data('uuid'); $.ajax({ url: "/communities/progs/delete_member/" + pk + "/" + uuid + "/", success: function () { member_delete.parent().html("<span class='community_member_create' style='cursor:pointer;color:rgba(0, 0, 0, 1);'>Восстановить</span>"); li.addClass("style_removed_object"); }});});

$('body').on('click', '.member_create', function() {member_create = $(this);pk = member_create.data('id');uuid = member_create.data('uuid');$.ajax({url: "/communities/progs/add_member/" + pk + "/" + uuid + "/",success: function () {$('#ajax').html('').load("/communities/reload/" + pk + "/");}});});
$('body').on('click', '.member_delete', function() {member_delete = $(this);pk = member_delete.data('id');uuid = member_create.data('uuid');$.ajax({url: "/communities/progs/delete_member/" + pk + "/" + uuid + "/",success: function () {$('#ajax').html('').load("/communities/reload/" + pk + "/");}});});

$('body').on('click', '.c_add_post', function() {var btn = $(this); var pk = btn.data('pk'); var frm_post = $('#COMM-POST'); var stream = frm_post.parent().next();$.ajax({type: frm_post.attr('method'), url: "/posts/add_post_community/" + pk + "/", data: frm_post.serialize(),success: function(data) {stream.find(".community_stream").prepend(data); stream.find(".post_empty").hide(); $(".id_text").val(""); $(".add_board #for_images_upload").hide(); $(".add_board #for_gallery").hide(); $(".add_board #for_doc").hide(); $(".add_board #for_good").hide(); $(".add_board #for_question").hide(); $(".add_board #for_settings").hide();$.toast({heading: 'Успешно',text: 'Запись успешно создана!',showHideTransition: 'fade',icon: 'success'})},error: function(data) {$.toast({heading: 'Ошибка',text: 'Для публикации записи нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition: 'fade',icon: 'error'})}}); return false;});

$("body").on('click', '.u_like', function() {
  like = $(this);
  item = like.parents('.infinite-item');
  pk = item.attr("user-id");
  uuid = item.attr("item-id");
  dislike = like.next().next();
  $.ajax({
    url: "/votes/user_like/" + uuid + "/" + pk + "/",
    type: 'POST',
    data: {'obj': pk},
    success: function(json){
      like.find("[data-count='like']").text(json.like_count);
      like.toggleClass('btn_success btn_default');
      like.next().html('').load("/window/u_like_window/" + uuid + "/" + pk + "/");
      dislike.find("[data-count='dislike']").text(json.dislike_count);
      dislike.removeClass('btn_danger').addClass("btn_default");
      dislike.next().html('').load("/window/u_dislike_window/" + uuid + "/" + pk + "/")
}
});
      return false;
});

$("body").on('click', '.u_dislike', function() {
  dislike = $(this);
  item = dislike.parents('.infinite-item');
  pk = item.attr("user-id");
  uuid = item.attr("item-id");
  like = dislike.prev().prev();
  $.ajax({
    url: "/votes/user_dislike/" + uuid + "/" + pk + "/",
    type: 'POST',
    data: {'obj': pk},
    success: function(json) {
      like.find("[data-count='like']").text(json.like_count);
      like.removeClass('btn_success').addClass("btn_default");
      like.next().html('').load("/window/u_like_window/" + uuid + "/" + pk + "/");
      dislike.find("[data-count='dislike']").text(json.dislike_count);
      dislike.toggleClass('btn_danger btn_default');
      dislike.next().html('').load("/window/u_dislike_window/" + uuid + "/" + pk + "/")
  }
    });
    return false;
  });

$("body").on('click', '.u_like2', function() {like = $(this);pk = like.data('pk');uuid = like.data('uuid');dislike = like.next().next();$.ajax({url: "/votes/user_comment/" + uuid + "/" + pk + "/like/", type: 'POST', data: {'obj': pk},success: function(json) {like.find("[data-count='like']").text(json.like_count); like.toggleClass('btn_success btn_default'); like.next().html('').load("/window/u_comment_like_window/" + uuid + "/" + pk + "/");dislike.find("[data-count='dislike']").text(json.dislike_count); dislike.removeClass('btn_danger').addClass("btn_default"); dislike.next().html('').load("/window/u_comment_dislike_window/" + uuid + "/" + pk + "/")}});return false;});
$("body").on('click', '.u_dislike2', function() {dislike = $(this);pk = dislike.data('pk');uuid = dislike.data('uuid');like = dislike.prev().prev();$.ajax({url: "/votes/user_comment/" + uuid + "/" + pk + "/dislike/", type: 'POST', data: {'obj': pk},success: function(json) {like.find("[data-count='like']").text(json.like_count); like.removeClass('btn_success').addClass("btn_default"); like.next().html('').load("/window/u_comment_like_window/" + uuid + "/" + pk + "/");dislike.find("[data-count='dislike']").text(json.dislike_count); dislike.toggleClass('btn_danger btn_default'); dislike.next().html('').load("/window/u_comment_dislike_window/" + uuid + "/" + pk + "/")}});return false;});

$("body").on('click', '.c_like', function() {like = $(this);item = like.parents('.infinite-item');uuid = item.attr("item-id");pk = item.attr("community-id"); dislike = like.next().next();$.ajax({url: "/votes/community_like/" + uuid + "/" + pk + "/", type: 'POST', data: {'obj': pk},success: function(json) {like.find("[data-count='like']").text(json.like_count);like.toggleClass('btn_success btn_default');like.next().html('').load("/window/c_like_window/" + uuid + "/" + pk + "/");dislike.find("[data-count='dislike']").text(json.dislike_count);dislike.removeClass('btn_danger').addClass("btn_default");dislike.next().html('').load("/window/c_dislike_window/" + uuid + "/" + pk + "/")}}); return false;});
$("body").on('click', '.c_dislike', function() {dislike = $(this); item = dislike.parents('.infinite-item');uuid = item.attr("item-id"); var pk = item.attr("community-id");like = dislike.prev().prev();$.ajax({url: "/votes/community_dislike/" + uuid + "/" + pk + "/", type: 'POST', data: {'obj': pk},success: function(json) {like.find("[data-count='like']").text(json.like_count);like.removeClass('btn_success').addClass("btn_default");like.next().html('').load("/window/c_like_window/" + uuid + "/" + pk + "/");dislike.find("[data-count='dislike']").text(json.dislike_count); dislike.toggleClass('btn_danger btn_default');dislike.next().html('').load("/window/c_dislike_window/" + uuid + "/" + pk + "/")}}); return false;});

$("body").on('click', '.c_like2', function() {like = $(this);pk = like.data('pk');uuid = like.data('uuid');dislike = like.next().next();$.ajax({url: "/votes/community_comment/" + uuid + "/" + pk + "/like/", type: 'POST', data: {'obj': pk},success: function(json) {like.find("[data-count='like']").text(json.like_count);like.toggleClass('btn_success btn_default');like.next().html('').load("/window/c_comment_like_window/" + uuid + "/" + pk + "/");dislike.find("[data-count='dislike']").text(json.dislike_count); dislike.removeClass('btn_danger').addClass("btn_default");dislike.next().html('').load("/window/c_comment_dislike_window/" + uuid + "/" + pk + "/")}}); return false;});
$("body").on('click', '.c_dislike2', function() {dislike = $(this);pk = dislike.data('pk');uuid = dislike.data('uuid');like = dislike.prev().prev();$.ajax({url: "/votes/community_comment/" + uuid + "/" + pk + "/dislike/",type: 'POST',data: { 'obj': pk },success: function(json) {like.find("[data-count='like']").text(json.like_count); like.removeClass('btn_success').addClass("btn_default");like.next().html('').load("/window/c_comment_like_window/" + uuid + "/" + pk + "/");dislike.find("[data-count='dislike']").text(json.dislike_count); dislike.toggleClass('btn_danger btn_default');dislike.next().html('').load("/window/c_comment_dislike_window/" + uuid + "/" + pk + "/")}});return false;});

$('body').on('click', '.c_itemComment', function() {button1 = $(this); form1 = button1.parent().parent().parent(); upload_block = form1.find(".upload_block");$.ajax({url: '/community/post-comment/', data: new FormData($(form1)[0]), contentType: false, cache: false, processData: false, type: 'POST',success: function(data) { $(".form-control-rounded").val(""); form1.parent().prev().append(data); upload_block.empty()},error: function(data) { $.toast({heading: 'Ошибка',text: 'Для публикации комментария нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition: 'fade',icon: 'error'}); },});return false;});
$('body').on('click', '.c_replyComment', function() {button = $(this); form2 = button.parent().parent().parent().parent(); block = form2.parent(); upload_block = form2.find(".upload_block"); reply_stream = block.next().next(); pk = button.data('pk'); uuid = button.data('uuid');$.ajax({url: '/community/reply-comment/' + uuid + "/" + pk + "/",data: new FormData($(form2)[0]),contentType: false, cache: false, processData: false, type: 'POST',success: function(data) { $(".form-control-rounded").val(""); reply_stream.append(data); reply_stream.addClass("replies_open"); block.hide(); upload_block.empty(); },error: function(data) { $.toast({heading: 'Ошибка',text: 'Для публикации ответа нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition: 'fade',icon: 'error'}) },});return false;});
$('body').on('click', '.c_replyParentComment', function() {button = $(this); form3 = button.parent().parent().parent().parent(); block = form3.parent(); upload_block = form3.find(".upload_block"); pk = button.data('pk'); uuid = button.data('uuid'); reply_stream = block.parents('.stream_reply_comments');$.ajax({url: '/community/reply-comment/' + uuid + "/" + pk + "/",data: new FormData($(form3)[0]), contentType:false, cache:false, processData:false, type:'POST',success: function(data) { $(".form-control-rounded").val(""); reply_stream.append(data); block.hide(); upload_block.empty();},error: function(data) { $.toast({heading: 'Ошибка',text: 'Для публикации ответа нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition:'fade',icon:'error'}) },});return false;});

$('body').on('click', '.item_community_remove', function() {link = $(this).parent(); pk = link.parents(".infinite-item").attr("community-id");uuid = link.parents(".infinite-item").attr("item-id");$.ajax({url: "/community/delete/" + pk + "/" + uuid + "/",success: function(data) {$(link).parents('.card').hide();$('.activefullscreen').hide();$.toast({heading: 'Информация',text: 'Запись успешно удалена!',showHideTransition: 'fade',icon: 'info'})}});});
$('body').on('click', '.item_community_fixed', function() {link = $(this).parent(); pk = link.parents(".infinite-item").attr("community-id");uuid = link.parents(".infinite-item").attr("item-id");$.ajax({url: "/community/fixed/" + pk + "/" + uuid + "/",success: function(data) {link.parent().html("<span class='dropdown-item item_community_unfixed'> Открепить</span>");$.toast({heading: 'Информация',text: 'Запись закреплена!',showHideTransition: 'fade',icon:'info'})}});});
$('body').on('click', '.item_community_unfixed', function() {link = $(this).parent(); pk = link.parents(".infinite-item").attr("community-id");uuid = link.parents(".infinite-item").attr("item-id");$.ajax({url: "/community/unfixed/" + pk + "/" + uuid + "/",success: function(data) {link.parent().html("<span class='dropdown-item item_community_fixed'>Закрепить</span>");$.toast({heading: 'Информация',text: 'Запись откреплена!',showHideTransition: 'fade',icon: 'info'})}});});
$('body').on('click','.item_community_off_comment',function(){link=$(this).parent(); pk=link.parents(".infinite-item").attr("community-id");uuid=link.parents(".infinite-item").attr("item-id");$.ajax({url: "/community/off_comment/" + pk + "/" + uuid + "/",success: function(data) {link.parent().html("<span class='dropdown-item item_community_unfixed'>Выключить комментарии</span>");$.toast({heading: 'Информация',text: 'Комментарии выключены!',showHideTransition: 'fade',icon:'info'})}});});
$('body').on('click', '.item_community_on_comment', function() {link=$(this).parent(); pk=link.parents(".infinite-item").attr("community-id");uuid=link.parents(".infinite-item").attr("item-id");$.ajax({url: "/community/on_comment/" + pk + "/" + uuid + "/",success: function(data) {link.parent().html("<span class='dropdown-item item_community_fixed'>Включить комментарии</span>");$.toast({heading: 'Информация',text: 'Комментарии включены!',showHideTransition: 'fade',icon: 'info'})}});});
$('body').on('click', '.js-textareacopybtn', function() {btn = $(this);link = btn.find('.js-copytextarea');link.focus();link.select();try {successful = document.execCommand('copy');msg = successful ? 'successful' : 'unsuccessful';console.log('Copying text command was ' + msg);} catch (err) {console.log('Oops, unable to copy');}});


/*!
   staff scripts for community
  */
$('body').on('click','.community_member_create',function(){member_create=$(this);li=member_create.parents(".list-group-item");pk=li.data('pk');uuid=li.data('uuid');$.ajax({ url: "/communities/progs/add_member/" + pk + "/" + uuid + "/", success:function () {member_create.parent().html("<span class='show_staff_window' style='cursor:pointer'>Изменить полномочия</span> |<span class='community_member_delete' style='cursor:pointer'>Удалить</span>");li.removeClass("style_removed_object"); }});});
$('body').on('click', '.community_follow_create', function() {community_follow_create = $(this);li = community_follow_create.parents(".list-group-item");pk = li.data('pk');uuid = li.data('uuid');$.ajax({url: "/follows/add_member/" + pk + "/" + uuid + "/",success:function (){community_follow_create.parent().html("<span class='community_follow_delete' style='cursor:pointer;color:rgba(0, 0, 0, 1);'>Восстановить</span>");li.removeClass("style_removed_object");}});});
$('body').on('click', '.community_follow_delete', function() {community_follow_delete = $(this);li = community_follow_delete.parents(".list-group-item");pk = li.data('pk');uuid = li.data('uuid');$.ajax({url: "/follows/delete_member/" + pk + "/" + uuid + "/",success: function () {community_follow_delete.parent().html("<span class='community_follow_create' style='cursor:pointer;color:rgba(0, 0, 0, 1);'>Восстановить</span>");li.addClass("style_removed_object"); }});});
$('body').on('click', '.remove_admin', function() {remove_admin = $(this);li = remove_admin.parents(".list-group-item");pk = li.data('pk');uuid = li.data('uuid');$.ajax({url: "/communities/progs/delete_admin/" + pk + "/" + uuid + "/",success: function () {remove_admin.parent().parent().addClass("small").html("<span class='show_staff_window' style='cursor:pointer'>Назначить руководителем</span> | <span class='community_member_delete' style='cursor:pointer'>Удалить</span>");$.toast({heading: 'Информация',text: 'Администратор успешно лишен полномочий!',showHideTransition: 'fade',icon: 'info'});}});});
$('body').on('click', '.remove_moderator', function() {remove_admin = $(this);li = remove_admin.parents(".list-group-item");pk = li.data('pk');uuid = li.data('uuid');$.ajax({url: "/communities/progs/delete_moderator/" + pk + "/" + uuid + "/",success: function () {remove_admin.parent().parent().addClass("small").html("<span class='show_staff_window' style='cursor:pointer'>Назначить руководителем</span> | <span class='community_member_delete' style='cursor:pointer'>Удалить</span>");$.toast({heading: 'Информация',text: 'Модератор успешно лишен полномочий!',showHideTransition: 'fade',icon: 'info'});}});});
$('body').on('click', '.remove_editor', function() {remove_admin = $(this);li = remove_admin.parents(".list-group-item");pk = li.data('pk');uuid = li.data('uuid');$.ajax({url: "/communities/progs/delete_editor/" + pk + "/" + uuid + "/",success: function () {remove_admin.parent().parent().addClass("small").html("<span class='show_staff_window' style='cursor:pointer'>Назначить руководителем</span> | <span class='community_member_delete' style='cursor:pointer'>Удалить</span>");$.toast({heading: 'Информация',text: 'Редактор успешно лишен полномочий!',showHideTransition: 'fade',icon: 'info'});}});});
$('body').on('click', '.remove_advertiser', function() {remove_admin = $(this);li = remove_admin.parents(".list-group-item");pk = li.data('pk');uuid = li.data('uuid');$.ajax({url: "/communities/progs/delete_advertiser/" + pk + "/" + uuid + "/",success: function () {remove_admin.parent().parent().addClass("small").html("<span class='show_staff_window' style='cursor:pointer'>Назначить руководителем</span> | <span class='community_member_delete' style='cursor:pointer'>Удалить</span>");$.toast({heading: 'Информация',text: 'Рекламодатель успешно лишен полномочий!',showHideTransition: 'fade',icon: 'info'});}});});


/*!
     photo post scripts for user
  */
$('body').on('click', '.u_photo_off_comment', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/close_comment/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append('<span style="cursor:pointer" class="u_photo_on_comment">Включить комментарии</span>');$.toast({heading: 'Информация',text: 'Комментарии успешно отключены',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '.u_photo_on_comment', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/close_comment/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append('<span style="cursor:pointer" class="u_photo_off_comment">Выключить комментарии</span>');$.toast({heading: 'Информация',text: 'Комментарии успешно включены',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '.u_photo_on_private', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/on_private/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append('<span style="cursor:pointer" class="u_photo_off_private">Отключить приватность</span>');$.toast({heading: 'Информация',text: 'Приватность успешно включена',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '.u_photo_off_private', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/off_private/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append('<span style="cursor:pointer" class="u_photo_on_private">Включить приватность</span>');$.toast({heading: 'Информация',text: 'Приватность успешно отключена',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '.u_unset_avatar', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/remove_avatar/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append('<span style="cursor:pointer" class="u_set_avatar">На аватар</span>');$.toast({heading: 'Информация',text: 'Аватар успешно обновился',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '.u_set_avatar', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/add_avatar/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append('<span style="cursor:pointer" class="u_unset_avatar">Убрать аватар</span>');$.toast({heading: 'Информация',text: 'Аватар успешно обновился',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '#user_photo_abort_remove', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/abort_delete/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append('<span  style="cursor:pointer" id="user_photo_remove">Удалить</span>');display.removeClass("style_removed_object");$.toast({heading: 'Информация',text: 'Фотография успешно восстановлена',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '#user_photo_remove', function() {button = $(this);display = button.parents(".data_display");remove_block = button.parent();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/delete/' + pk + "/" + uuid + "/",success: function(data) {remove_block.empty().append("<span style='cursor:pointer;color:rgba(0, 0, 0, 1);' id='user_photo_abort_remove'>Восстановить</span>");display.addClass("style_removed_object");$.toast({heading: 'Информация',text: 'Фотография успешно удалена',showHideTransition: 'fade',icon: 'link'});}});return false;});
$('body').on('click', '#u_photo_description_btn', function() {button = $(this);form2 = button.parent().parent().parent();display = button.parents(".data_display");description_block = form2.parent().prev();pk = display.data('pk');uuid = display.data('uuid');$.ajax({url: '/gallery/user_progs/description/' + pk + "/" + uuid + "/",data: form2.serialize(),type: 'post',success: function(data) {description = $("#id_description").val();description_block.empty().append(description + "<br><br><span style='cursor:pointer' class='u_photo_edit'>Редактировать</span>");form2.parent().hide();}});return false;});


/*!
     frend-follow scripts
  */
$('body').on('click', '.user_block', function() {pk = $(this).parent().data("pk");$.ajax({url: "/users/progs/block/" + pk + "/",success: function () {$('#button_load').html('').load("/users/load/profile_button/" + pk + "/");}});});
$('body').on('click', '.user_unblock', function() {pk = $(this).parent().data("pk");$.ajax({url: "/users/progs/unblock/" + pk + "/",success: function () {$('#button_load').html('').load("/users/load/profile_button/" + pk + "/");}});});
$('body').on('click', '.follow_create', function() {pk = $(this).data("pk");$.ajax({url: "/follows/add/" + pk + "/",success: function () {$('#button_load').html('').load("/users/load/profile_button/" + pk + "/");}});});
$('body').on('click', '.follow_delete', function() {pk = $(this).parent().data("pk");$.ajax({url: "/follows/delete/" + pk + "/",success: function () {$('#button_load').html('').load("/users/load/profile_button/" + pk + "/");}});});
$('body').on('click', '.connect_create', function() {pk = $(this).parent().data("pk");$.ajax({url: "/frends/add/" + pk + "/",success: function () {$('#button_load').html('').load("/users/load/profile_button/" + pk + "/");}});});
$('body').on('click', '.connect_delete', function() {pk = $(this).parent().data("pk");$.ajax({url: "/frends/delete/" + pk + "/",success: function () {$('#button_load').html('').load("/users/load/profile_button/" + pk + "/");}});});


/*!
     music scripts for user
  */
$('body').on('click', '.track_add', function() {btn = $(this);block = btn.parent();pk = block.parent().data("pk");$.ajax({url: "/music/manage/add_track/" + pk + "/",success: function (data) {$.toast({heading: 'Информация',text: 'Трек добавлен в Ваш основной плейлист!',showHideTransition: 'fade',icon: 'info'});btn.remove();block.append("<span class='track_remove' title='Удалить'><svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' style='width:20px;' class='svg_default' viewBox='0 0 2424'><path fill='none' d='M0 0h24v24H0z'/><path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'/></svg></span>")}});});
$('body').on('click', '.track_remove', function() {btn = $(this);block = btn.parent();pk = block.parent().data("pk");$.ajax({url: "/music/manage/remove_track/" + pk + "/",success: function () {$.toast({heading: 'Информация',text: 'Трек удален из Вашего основного плейлиста!',showHideTransition: 'fade',icon: 'info'});btn.remove();block.append("<span class='track_add' title='Добавить'><svg fill='currentColor' style='width:25px;' class='svg_default' xmlns='http://www.w3.org/2000/svg' viewBox='0 024 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/><path d='M0 0h24v24H0z' fill='none'/></svg></span>")}});});

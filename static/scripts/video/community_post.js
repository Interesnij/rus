on('#ajax', 'click', '#c_ucm_video_repost_btn', function() {
  repost_constructor(this,
                     "/video/repost/c_u_video_repost/",
                     "Репост видеозаписи на стену сделан",
                     "/video/repost/c_c_video_repost/",
                     "Репост видеозаписи в сообщества сделан",
                     "/video/repost/c_m_video_repost/",
                     "Репост видеозаписи в сообщения сделан")
});
on('#ajax', 'click', '#c_ucm_video_album_repost_btn', function() {
  repost_constructor(this,
                     "/video/repost/c_u_video_album_repost/",
                     "Репост видеоальбома на стену сделан",
                     "/video/repost/c_c_video_album_repost/",
                     "Репост видеоальбома в сообщества сделан",
                     "/video/repost/c_m_video_album_repost/",
                     "Репост видеоальбома в сообщения сделан")
});

on('#video_loader', 'click', '.c_videoComment', function() {
  form = this.parentElement.parentElement.parentElement;
  send_comment(form, form.parentElement.previousElementSibling, '/video/community_progs/post-comment/');
});

on('#video_loader', 'click', '.c_replyVideoComment', function() {
  form = this.parentElement.parentElement.parentElement.parentElement;
  block = form.parentElement.parentElement.querySelector(".stream_reply_comments");
  send_comment(form, block, '/video/community_progs/reply-comment/')
  form.parentElement.style.display = "none";
  block.classList.add("replies_open")
});

on('#video_loader', 'click', '.c_replyParentVideoComment', function() {
  form = this.parentElement.parentElement.parentElement.parentElement;
  block = form.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  send_comment(form, block.parentElement, '/video/community_progs/reply-comment/')
  form.parentElement.style.display = "none";
  block.classList.add("replies_open")
});

on('#video_loader', 'click', '.c_video_off_comment', function() {
  send_photo_change(this, "/video/community_progs/off_comment/", "c_video_on_comment", "Вкл. комментарии");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".c_video_comments").style.display = "none"
})
on('#video_loader', 'click', '.c_video_on_comment', function() {
  send_photo_change(this, "/video/community_progs/on_comment/", "c_video_off_comment", "Выкл. комментарии");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".c_video_comments").style.display = "unset"
})

on('#video_loader', 'click', '.c_video_comment_delete', function() {
  comment_delete(this, "/video/community_progs/delete_comment/", "c_video_comment_abort_remove")
})
on('#video_loader', 'click', '.c_video_comment_abort_remove', function() {
  comment_abort_delete(this, "/video/community_progs/abort_delete_comment/")
});


on('#video_loader', 'click', '.u_video_off_private', function() {
  send_photo_change(this, "/video/community_progs/off_private/", "c_video_on_private", "Вкл. приватность")
})
on('#video_loader', 'click', '.c_video_on_private', function() {
  send_photo_change(this, "/video/community_progs/on_private/", "c_video_off_private", "Выкл. приватность")
})

on('#video_loader', 'click', '.c_video_off_votes', function() {
  send_photo_change(this, "/video/community_progs/off_votes/", "c_video_on_votes", "Вкл. реакции");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".like").style.display = "none";
  post.querySelector(".dislike").style.display = "none";
})
on('#video_loader', 'click', '.c_video_on_votes', function() {
  send_photo_change(this, "/video/community_progs/on_votes/", "c_video_off_votes", "Выкл. реакции");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".like").style.display = "unset";
  post.querySelector(".dislike").style.display = "unset";
})

on('body', 'click', '.community_video_remove', function() {
  send_photo_change(this, "/video/community_progs/delete/", "community_video_abort_remove", "Отмена");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  this.parentElement.parentElement.nextElementSibling.style.display = "none";
  post.querySelector(".order-2").style.display = "none";
  post.querySelector(".card").style.opacity = "0.5";
  this.style.color = "#FF0000";
})
on('body', 'click', '.community_video_abort_remove', function() {
  send_photo_change(this, "/video/community_progs/abort_delete/", "community_video_remove", "Удалить");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  this.parentElement.parentElement.nextElementSibling.style.display = "unset";
  post.querySelector(".order-2").style.display = "unset";
  post.querySelector(".card").style.opacity = "1";
})

on('#video_loader', 'click', '.c_video_like', function() {
  video = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = document.body.querySelector(".data_display").getAttribute("data-uuid");
  pk = document.body.querySelector(".data_display").getAttribute("data-pk");
  send_like(video, "/video/votes/community_like/" + uuid + "/" + pk + "/");
  like_reload(this.nextElementSibling, this.nextElementSibling.nextElementSibling.nextElementSibling, "u_all_video_likes");
});
on('#video_loader', 'click', '.c_video_dislike', function() {
  video = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = document.body.querySelector(".data_display").getAttribute("data-uuid");
  pk = document.body.querySelector(".data_display").getAttribute("data-pk");
  send_dislike(video, "/video/votes/community_dislike/" + uuid + "/" + pk + "/");
  dislike_reload(this.previousElementSibling, this.nextElementSibling, "u_all_video_dislikes");
});
on('#video_loader', 'click', '.c_video_like2', function() {
  _this = this;
  video = _this.parentElement;
  comment_pk = video.getAttribute("data-pk");
  send_like(video, "/video/votes/community_comment/" + comment_pk + "/like/");
  like_reload(this.nextElementSibling, this.nextElementSibling.nextElementSibling.nextElementSibling, "u_all_video_comment_likes")
});
on('#video_loader', 'click', '.c_video_dislike2', function() {
  _this = this;
  video = _this.parentElement;
  comment_pk = video.getAttribute("data-pk");
  send_dislike(video, "/video/votes/community_comment/" + comment_pk + "/" + "/dislike/");
  dislike_reload(this.previousElementSibling, this.nextElementSibling, "u_all_video_comment_dislikes")
});

on('#ajax', 'click', '#c_edit_video_list_btn', function() {
  form = document.body.querySelector("#c_edit_good_list_form");
  form_data = new FormData(form);
  if (!form.querySelector("#id_title").value){
    form.querySelector("#id_title").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!");
  } else { this.disabled = true }

  pk = form.getAttribute("data-pk");
  uuid = form.getAttribute("data-uuid");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'POST', "/video/community_progs/edit_list/" + pk + "/" + uuid + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        name = form.querySelector('#id_title').value;
        document.body.querySelector(".list_name").innerHTML = name;
        close_create_window();
        toast_success("Список видео изменен")
      }
    }
    ajax_link.send(form_data);
});

on('#ajax', 'click', '.c_video_list_delete', function() {
  saver = document.querySelector(".pk_saver");
  pk = saver.getAttribute("data-pk");
  uuid = saver.getAttribute("data-uuid");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', "/video/community_progs/delete_list/" + pk + "/" + uuid + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        this_page_reload("/communities/" + pk + "/video_list/" + uuid + "/")
      }
    }
    ajax_link.send();
});

on('#ajax', 'click', '.c_video_list_recover', function() {
  saver = document.querySelector(".pk_saver");
  pk = saver.getAttribute("data-pk");
  uuid = saver.getAttribute("data-uuid");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', "/video/community_progs/abort_delete_list/" + pk + "/" + uuid + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        this_page_reload("/communities/" + pk + "/video_list/" + uuid + "/")
      }
    }
    ajax_link.send();
});

on('#ajax', 'click', '.c_video_create_window', function(e) {
  e.preventDefault();
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  loader = document.getElementById("create_loader");
  open_fullscreen("/video/community_progs/create_video/" + pk + "/", loader);
});

on('#ajax', 'click', '#c_create_video_list_btn', function() {
  this.disabled = true;
  form = document.body.querySelector("#c_video_list_create");
  if (!form.querySelector("#id_title").value){
    form.querySelector("#id_title").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!");
  } else { this.disabled = true }
  post_and_load_object_page(form, "/video/community_progs/create_list/", "/communities/", "/video_list/")

});

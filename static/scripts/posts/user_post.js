on('#ajax', 'click', '#u_ucm_post_repost_btn', function() {
  repost_constructor(this,
                     "/posts/repost/u_u_post_repost/",
                     "Репост записи на стену сделан",
                     "/posts/repost/u_c_post_repost/",
                     "Репост записи в сообщества сделан",
                     "/posts/repost/u_m_post_repost/",
                     "Репост записи в сообщения сделан")
});

on('#ajax', 'click', '#u_add_article', function() {
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  open_fullscreen("/article/u_article_window/" + pk + "/", document.getElementById("create_loader"));
  //CKEDITOR.replace('id_content');
  //CKEDITOR.instances.id_content.updateElement();
});

on('#ajax', 'click', '#u_add_post_btn', function() {
  form_post = document.querySelector("#form_post");
  form_data = new FormData(form_post);

  lenta_load = form_post.parentElement.parentElement.querySelector(".list_pk");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");

  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/posts/user_progs/add_post/" + pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    !form_post.querySelector(".list").value ? toast_error("Выберите список для новой записи") : null;
    form_post.querySelector('.id_text').value = "";
    clear_attach_block();

    elem = link_.responseText;
    new_post = document.createElement("span");
    new_post.innerHTML = elem;
    list = form_post.parentElement.parentElement.querySelector(".tab_active");
    list_name = list.innerHTML;
    list_pk = list.getAttribute("list-pk");
    drops = form_post.querySelectorAll(".dropdown-menu");
    for (var i = 0; i < drops.length; i++){drops[i].classList.remove("show")}
    (new_post.querySelector('.span1').classList.contains(list_pk) && new_post.querySelector(".card")) ? (lenta_load.prepend(new_post),
                                       toast_info('Запись опубликована'),
                                       lenta_load.querySelector(".post_empty") ? lenta_load.querySelector(".post_empty").style.display = "none" : null)
                                    :  toast_info('Запись опубликована');
  }};

  link_.send(form_data);
});

on('#ajax', 'click', '#u_add_post_list_btn', function() {
  form = document.body.querySelector("#post_list_form");
  form_data = new FormData(form);
  if (!form.querySelector("#id_name").value){form.querySelector("#id_name").style.border = "1px #FF0000 solid";toast_error("Название - обязательное поле!"); return
  } else if (!form.querySelector("#id_order").value){form.querySelector("#id_order").style.border = "1px #FF0000 solid";toast_error("Выберите порядковый номер!"); return
  } else { this.disabled = true }
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/posts/user_progs/add_list/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    date_list = document.body.querySelector(".date-list");
    list = date_list.querySelectorAll(".list");
    for (var i = 0; i < list.length; i++) {list[i].classList.remove("tab_active");list[i].classList.add("pointer", "u_post_list_change");};
    date_list.querySelector(".main_list").classList.remove("tab_active");
    date_list.querySelector(".main_list").classList.add("pointer", "u_posts_change");

    elem = link_.responseText;
    new_post = document.createElement("span");
    new_post.innerHTML = elem;
    post_stream = document.body.querySelector(".list_pk");
    post_stream.innerHTML = '';
    post_stream.innerHTML = '<div class="card mb-3 post_empty centered"><div class="card-body"><svg fill="currentColor" class="thumb_big svg_default" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z"/></svg></div><h6 style="margin: 20px;">Пока записей нет...</h6></div>';
    name = form.querySelector("#id_name").value;
    li = document.createElement("li");
    li.classList.add("date", "list", "tab_active");
    li.setAttribute("list-pk", new_post.querySelector(".list_pk").getAttribute("list-pk"));

    div = document.createElement("div");div.classList.add("media");_div = document.createElement("div");_div.classList.add("media-body");h6 = document.createElement("h6");h6.classList.add("mb-0");h6.innerHTML = name;_div.append(h6); div.append(_div);document.body.querySelector(".date-list").prepend(div);
    close_create_window()
  }};

  link_.send(form_data);
});

on('#ajax', 'click', '#u_edit_post_list_btn', function() {
  form = document.body.querySelector("#post_list_form");
  form_data = new FormData(form);
  if (!form.querySelector("#id_name").value){
    form.querySelector("#id_name").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!");
  } else if (!form.querySelector("#id_order").value){
    form.querySelector("#id_order").style.border = "1px #FF0000 solid";
    toast_error("Выберите порядковый номер!");
  } else { this.disabled = true }
  pk = form.getAttribute("data-pk");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'POST', "/posts/user_progs/edit_list/" + pk + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        name = form.querySelector('#id_name').value;
        title = document.body.querySelector( '[list-pk=' + '"' + pk + '"' + ']' );
        title.querySelector(".list_name").innerHTML = name;
        close_create_window();
        toast_success("Список изменен")
      }
    }
    ajax_link.send(form_data);
});

on('#ajax', 'click', '.u_delete_post_list', function() {
  _this = this;
  list_pk = _this.parentElement.parentElement.getAttribute("list-pk");
  block = _this.parentElement.nextElementSibling;

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', "/posts/user_progs/delete_list/" + list_pk + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        block.style.display = "none";
        _this.innerHTML = "Отменить удаление";
        _this.classList.remove("u_delete_post_list");
        _this.classList.add("u_abort_delete_post_list", "mb-5");
        toast_success("Список удален");
      }
    }
    ajax_link.send();
});
on('#ajax', 'click', '.u_abort_delete_post_list', function() {
  _this = this;
  list_pk = _this.parentElement.parentElement.getAttribute("list-pk");
  block = _this.parentElement.nextElementSibling;

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', "/posts/user_progs/abort_delete_list/" + list_pk + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        block.style.display = "block";
        _this.innerHTML = "удалить список";
        _this.classList.remove("u_abort_delete_post_list", "mb-5");
        _this.classList.add("u_delete_post_list");
        toast_success("Список восстановлен");
      }
    }
    ajax_link.send();
});

on('#ajax', 'click', '#article_post', function() {
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  form_data = new FormData(document.forms.new_post);
  form_post = document.querySelector("#user_article_form");
  CKEDITOR.instances.id_content.updateElement();
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/article/add_user/" + pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem = link_.responseText;
    new_post = document.createElement("span");
    new_post.innerHTML = elem;
    response = new_post.querySelector(".card");
    document.querySelector(".stream").prepend(response)
    document.querySelector(".post_empty") ? lenta_load.querySelector(".post_empty").style.display = "none" : null;
  }};

  link_.send(form_data);
});

on('#ajax', 'click', '.u_itemComment', function() {
  form = this.parentElement.parentElement.parentElement;
  send_comment(form, form.parentElement.previousElementSibling, '/posts/user_progs/post-comment/');
});

on('#ajax', 'click', '.u_replyItemComment', function() {
  form = this.parentElement.parentElement.parentElement.parentElement;
  block = form.parentElement.parentElement.querySelector(".stream_reply_comments");
  send_comment(form, block, '/posts/user_progs/reply-comment/')
  form.parentElement.style.display = "none";
  block.classList.add("replies_open");
});

on('#ajax', 'click', '.u_replyParentItemComment', function() {
  form = this.parentElement.parentElement.parentElement.parentElement;
  block = form.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  send_comment(form, block.parentElement, '/posts/user_progs/reply-comment/')
  form.parentElement.style.display = "none";
  block.classList.add("replies_open");
});

/*!
   item post scripts for user
  */
on('#ajax', 'click', '.u_post_remove', function() {
  item = this.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = item.getAttribute("data-uuid");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', "/posts/user_progs/delete/" + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    p = document.createElement("div");
    p.classList.add("card", "mb-3");
    p.style.padding = "20px";
    p.style.display =  "block";
    p.innerHTML = "Запись удалена. <span class='u_post_abort_remove pointer' data-uuid='" + uuid + "'>Восстановить</span>";
    !document.querySelector(".post_detail") ? (item.parentElement.insertBefore(p, item), item.style.display = "none")
    : (document.querySelector(".item_fullscreen").style.display = "none",
    block = document.body.querySelector(".post_container"),
    item = block.querySelector( '[data-uuid=' + '"' + uuid + '"' + ']' ),
    item.parentElement.insertBefore(p, item),
    item.style.display = "none")
  }};

  link.send( );
});
on('#ajax', 'click', '.u_post_wall_remove', function() {
  item = this.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = item.getAttribute("data-uuid");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', "/posts/user_progs/wall_delete/" + pk + "/" + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    p = document.createElement("div");
    p.classList.add("card", "mb-3");
    p.style.padding = "20px";
    p.style.display =  "block";
    p.innerHTML = "Запись удалена. <span class='u_post_wall_abort_remove pointer' data-uuid='" + uuid + "'>Восстановить</span>";
    !document.querySelector(".post_detail") ? (item.parentElement.insertBefore(p, item), item.style.display = "none")
    : (document.querySelector(".item_fullscreen").style.display = "none",
    block = document.body.querySelector(".post_stream"),
    item = block.querySelector( '[data-uuid=' + '"' + uuid + '"' + ']' ),
    item.parentElement.insertBefore(p, item),
    item.style.display = "none")
  }};

  link.send( );
});

on('#ajax', 'click', '.u_post_abort_remove', function() {
  item = this.parentElement.nextElementSibling;
  item.style.display = "block";
  uuid = this.getAttribute("data-uuid");
  block = this.parentElement;
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', "/posts/user_progs/abort_delete/" + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    block.remove();
  }};
  link.send();
});
on('#ajax', 'click', '.u_post_wall_abort_remove', function() {
  item = this.parentElement.nextElementSibling;
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  item.style.display = "block";
  uuid = this.getAttribute("data-uuid");
  block = this.parentElement;
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', "/posts/user_progs/wall_abort_delete/" + pk + "/" + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    block.remove();
  }};
  link.send();
});

on('#ajax', 'click', '.u_post_fixed', function() {
  send_change(this, "/posts/user_progs/fixed/", "u_post_unfixed", "Открепить")
})
on('#ajax', 'click', '.u_post_unfixed', function() {
  send_change(this, "/posts/user_progs/unfixed/", "u_post_fixed", "Закрепить")
})

on('#ajax', 'click', '.u_post_off_comment', function() {
  send_change(this, "/posts/user_progs/off_comment/", "u_post_on_comment", "Вкл. комментарии");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".u_item_comments") ? post.querySelector(".u_item_comments").style.display = "none"
  : post.querySelector(".u_news_item_comments").style.display = "none"
})
on('#ajax', 'click', '.u_post_on_comment', function() {
  send_change(this, "/posts/user_progs/on_comment/", "u_post_off_comment", "Выкл. комментарии");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".u_item_comments") ? post.querySelector(".u_item_comments").style.display = "unset"
  : post.querySelector(".u_news_item_comments").style.display = "unset"
})

on('#ajax', 'click', '.u_post_off_votes', function() {
  send_change(this, "/posts/user_progs/off_votes/", "u_post_on_votes", "Вкл. реакции");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".like").style.display = "none";
  post.querySelector(".dislike").style.display = "none";
})
on('#ajax', 'click', '.u_post_on_votes', function() {
  send_change(this, "/posts/user_progs/on_votes/", "u_post_off_votes", "Выкл. реакции");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".like").style.display = "unset";
  post.querySelector(".dislike").style.display = "unset";
})

on('#ajax', 'click', '.u_like', function() {
  item = this.parentElement.parentElement.parentElement.parentElement;
  uuid = item.getAttribute("data-uuid");
  document.body.querySelector(".pk_saver") ? pk = document.body.querySelector(".pk_saver").getAttribute('data-pk') : pk = item.getAttribute('data-pk');
  send_like(item, "/posts/votes/user_like/" + uuid + "/" + pk + "/");
  like_reload(this.nextElementSibling, this.nextElementSibling.nextElementSibling.nextElementSibling, "u_all_posts_likes");
});
on('#ajax', 'click', '.u_dislike', function() {
  item = this.parentElement.parentElement.parentElement.parentElement;
  uuid = item.getAttribute("data-uuid");
  document.body.querySelector(".pk_saver") ? pk = document.body.querySelector(".pk_saver").getAttribute('data-pk') : pk = item.getAttribute('data-pk');
  send_dislike(item, "/posts/votes/user_dislike/" + uuid + "/" + pk + "/");
  dislike_reload(this.previousElementSibling, this.nextElementSibling, "u_all_posts_dislikes");
});

on('#ajax', 'click', '.u_like2', function() {
  _this = this;
  item = _this.parentElement;
  comment_pk = item.getAttribute("data-pk");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  send_like(item, "/posts/votes/user_comment/" + comment_pk + "/" + pk + "/like/");
  like_reload(this.nextElementSibling, this.nextElementSibling.nextElementSibling.nextElementSibling, "u_all_posts_comment_likes")
});
on('#ajax', 'click', '.u_dislike2', function() {
  _this = this;
  item = _this.parentElement;
  comment_pk = item.getAttribute("data-pk");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  send_dislike(item, "/posts/votes/user_comment/" + comment_pk + "/" + pk + "/dislike/");
  dislike_reload(this.previousElementSibling, this.nextElementSibling, "u_all_posts_comment_dislikes")
});

on('#ajax', 'click', '.u_post_comment_delete', function() {
  comment_delete(this, "/posts/user_progs/delete_comment/", "u_post_comment_abort_remove")
})

on('#ajax', 'click', '.u_post_comment_abort_remove', function() {
  comment_abort_delete(this, "/posts/user_progs/abort_delete_comment/")
});

on('#ajax', 'click', '.u_post_wall_comment_delete', function() {
  comment_wall_delete(this, "/posts/user_progs/delete_wall_comment/", "u_post_comment_abort_remove")
})

on('#ajax', 'click', '.u_post_wall_comment_abort_remove', function() {
  comment_wall_abort_delete(this, "/posts/user_progs/abort_delete_wall_comment/")
});

on('#ajax', 'change', '#u_photo_post_attach', function() {
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  form = document.body.querySelector("#add_photos");
  form_data = new FormData(form);
  input = form.querySelector(".upload_for_post_attach")
  if (input.files.length > 10) {
      toast_error("Не больше 10 фотографий");
      return;
  }
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/gallery/user_progs/add_attach_photo/" + pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem = link_.responseText;
    response = document.createElement("span");
    response.innerHTML = elem;
    photo_list = response.querySelectorAll(".col-md-4");

    if (document.body.querySelector("attach_block")){
      block = document.body.querySelector(".attach_block");
      photo_post_upload_attach(photo_list, block, photo_list.length);
    } else if (document.body.querySelector(".message_attach_block")){
      block = document.body.querySelector(".message_attach_block");
      photo_message_upload_attach(photo_list, block, photo_list.length);
    }
    }
    close_create_window();
  }
  link_.send(form_data);
});

function onSelect(e) {
    if (e.files.length > 5) {
        alert("Only 5 files accepted.");
        e.preventDefault();
    }
}
on('#ajax', 'change', '#u_photo_post_comment_attach', function() {
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  form = document.body.querySelector("#add_comment_photos");
  form_data = new FormData(form);
  input = form.querySelector("#u_photo_post_comment_attach")
  if (input.files.length > 2) {
      toast_error("Не больше 2 фотографий");
      return;
  }
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/gallery/user_progs/add_comment_photo/" + pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem = link_.responseText;
    response = document.createElement("span");
    response.innerHTML = elem;
    photo_list = response.querySelectorAll(".col-md-4");
    photo_comment_upload_attach(photo_list, document.body.querySelector(".current_file_dropdown").parentElement.parentElement, photo_list.length);
    }
    close_create_window();
  }
  link_.send(form_data);
});

on('#ajax', 'click', '.photo_load_several', function() {
  previous = this.previousElementSibling
  _this = previous.querySelector("img");
  photo_pk = previous.getAttribute('photo-pk');
  user_pk = previous.getAttribute('data-pk');
  src = _this.parentElement.getAttribute("data-href");
  if (document.body.querySelector(".current_file_dropdown")){
    check_photo_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, photo_pk) ? null : (photo_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, photo_pk, user_pk, src), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".attach_block")){
    check_photo_in_block(document.body.querySelector(".attach_block"), _this, photo_pk) ? null : (photo_post_attach(document.body.querySelector(".attach_block"), photo_pk, user_pk, src), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".message_attach_block")){
    check_photo_in_block(document.body.querySelector(".message_attach_block"), _this, photo_pk) ? null : (photo_message_attach(document.body.querySelector(".message_attach_block"), photo_pk, user_pk, src), this.classList.add("active_svg"))
  }
});

on('#ajax', 'click', '.photo_load_one', function() {
  _this = this;
  photo_pk = _this.parentElement.getAttribute('photo-pk');
  user_pk = _this.parentElement.getAttribute('data-pk');
  src = _this.parentElement.getAttribute("data-href");
  if (document.body.querySelector(".current_file_dropdown")){
    check_photo_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, photo_pk) ? null : (photo_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, photo_pk, user_pk, src), close_create_window())
  } else if (document.body.querySelector(".attach_block")){
    check_photo_in_block(document.body.querySelector(".attach_block"), _this, photo_pk) ? null : (photo_post_attach(document.body.querySelector(".attach_block"), photo_pk, user_pk, src), close_create_window())
  } else if (document.body.querySelector(".message_attach_block")){
    check_photo_in_block(document.body.querySelector(".message_attach_block"), _this, photo_pk) ? null : (photo_message_attach(document.body.querySelector(".message_attach_block"), photo_pk, user_pk, src), close_create_window())
  }
});

on('#ajax', 'click', '.u_create_video_attach_btn', function() {
  form_data = new FormData(document.querySelector("#create_video_form"));
  user_pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/video/progs/create_video_attach/" + user_pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem_ = document.createElement('div');
    elem_.innerHTML = link_.responseText;

    dropdown = document.body.querySelector(".current_file_dropdown").parentElement.parentElement;
    video_comment_attach(elem_.querySelector("img"), dropdown);

    close_create_window()
  }};

  link_.send(form_data);
});

on('#ajax', 'click', '.video_load_one', function() {
  _this = this;
  pk = _this.getAttribute('video-pk');
  counter = _this.getAttribute('video-counter');
  src = _this.getAttribute('src');
  if (document.body.querySelector(".current_file_dropdown")){
    check_video_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, pk) ? null : (video_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, pk, counter, src), close_create_window())
  } else if (document.body.querySelector(".attach_block")){
    check_video_in_block(document.body.querySelector(".attach_block"), _this, pk) ? null : (video_post_attach(document.body.querySelector(".attach_block"), pk, counter, src), close_create_window())
  } else if (document.body.querySelector(".message_attach_block")){
    check_video_in_block(document.body.querySelector(".message_attach_block"), _this, pk) ? null : (video_message_attach(document.body.querySelector(".message_attach_block"), pk, counter, src), close_create_window())
  }
});
on('#ajax', 'click', '.video_load_several', function() {
  previous = this.previousElementSibling
  _this = previous.querySelector("img");
  pk = _this.getAttribute('video-pk');
  counter = _this.getAttribute('video-counter');
  src = _this.getAttribute('src');
  if (document.body.querySelector(".current_file_dropdown")){
    check_video_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, pk) ? null : (video_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, pk, counter, src), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".attach_block")){
    check_video_in_block(document.body.querySelector(".attach_block"), _this, pk) ? null : (video_post_attach(document.body.querySelector(".attach_block"), pk, counter, src), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".message_attach_block")){
    check_video_in_block(document.body.querySelector(".message_attach_block"), _this, pk) ? null : (video_message_attach(document.body.querySelector(".message_attach_block"), pk, counter, src), this.classList.add("active_svg"))
  }
});

on('#ajax', 'click', '.music_load_one', function() {
  _this = this;
  pk = _this.getAttribute('music-pk');
  counter = _this.getAttribute('music-counter');
  _this.querySelector("img") ? src = _this.querySelector("img").getAttribute('src') : src = '/static/images/no_track_img.jpg'
  if (document.body.querySelector(".current_file_dropdown")){
    check_music_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, counter) ? null : (music_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, pk, counter, src), close_create_window())
  } else if (document.body.querySelector(".attach_block")){
    check_music_in_block(document.body.querySelector(".attach_block"), _this, counter) ? null : (music_post_attach(document.body.querySelector(".attach_block"), pk, counter, src), close_create_window())
  } else if (document.body.querySelector(".message_attach_block")){
    check_music_in_block(document.body.querySelector(".message_attach_block"), _this, counter) ? null : (music_message_attach(document.body.querySelector(".message_attach_block"), pk, counter, src), close_create_window())
  }
  if (document.body.querySelector(".current_file_dropdown")){
    music_comment_attach(_this, document.body.querySelector(".current_file_dropdown").parentElement.parentElement)
  } else if (document.body.querySelector(".attach_block")){
    music_post_attach(_this, document.body.querySelector(".attach_block"))
  }
  close_create_window()
});
on('#ajax', 'click', '.music_load_several', function() {
  _this = this.previousElementSibling
  pk = _this.getAttribute('music-pk');
  counter = _this.getAttribute('music-counter');
  _this.querySelector("img") ? src = _this.querySelector("img").getAttribute('src') : src = '/static/images/no_track_img.jpg'
  if (document.body.querySelector(".current_file_dropdown")){
    check_music_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, counter) ? null : (music_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, pk, counter, src), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".attach_block")){
    check_music_in_block(document.body.querySelector(".attach_block"), _this, counter) ? null : (music_post_attach(document.body.querySelector(".attach_block"), pk, counter, src), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".message_attach_block")){
    check_music_in_block(document.body.querySelector(".message_attach_block"), _this, counter) ? null : (music_message_attach(document.body.querySelector(".message_attach_block"), pk, counter, src), this.classList.add("active_svg"))
  }
});
on('#ajax', 'click', '.doc_load_several', function() {
  _this = this.previousElementSibling;
  pk = _this.getAttribute('data-pk');
  media_block = _this.querySelector(".media-body")
  if (document.body.querySelector(".current_file_dropdown")){
    check_doc_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, pk) ? null : (doc_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, media_block, pk), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".attach_block")){
    check_doc_in_block(document.body.querySelector(".attach_block"), _this, pk) ? null : (doc_post_attach(document.body.querySelector(".attach_block"), media_block, pk), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".message_attach_block")){
    check_doc_in_block(document.body.querySelector(".message_attach_block"), _this, pk) ? null : (doc_message_attach(document.body.querySelector(".message_attach_block"), media_block, pk), this.classList.add("active_svg"))
  }
});

on('#ajax', 'click', '.music_attach_playlist', function() {
  attach_item_for_post(this, "/music/get/playlist_preview/")
});
on('#ajax', 'click', '.photo_attach_album', function() {
  attach_item_for_post(this, "/gallery/user_progs/get_album_preview/")
});
on('#ajax', 'click', '.attach_video_album', function() {
  attach_item_for_post(this, "/video/user_progs/get_album_preview/")
});
on('#ajax', 'click', '.attach_doc_list', function() {
  attach_item_for_post(this, "/docs/user_progs/list_preview/")
});
on('#ajax', 'click', '.attach_survey', function() {
  attach_item_for_post(this, "/survey/user_progs/preview/")
});
on('#ajax', 'click', '.attach_good_album', function() {
  attach_item_for_post(this, "/goods/user_progs/get_album_preview/")
});

on('#ajax', 'click', '.music_attach_playlist_remove', function() {
  block = this.parentElement.parentElement.parentElement;
  block.parentElement.nextElementSibling.querySelector(".attach_panel").style.display = "block";
  block.remove();
  remove_file_attach();
})
on('#ajax', 'click', '.survey_attach_remove', function() {
  block = this.parentElement.parentElement;
  block.parentElement.nextElementSibling.querySelector(".attach_panel").style.display = "block";
  block.remove();
  remove_file_attach();
})
on('#ajax', 'click', '.doc_attach_list_remove', function() {
  block = this.parentElement.parentElement.parentElement;
  block.parentElement.nextElementSibling.querySelector(".attach_panel").style.display = "block";
  block.remove();
  remove_file_attach();
})
on('#ajax', 'click', '.video_attach_album_remove', function() {
  block = this.parentElement.parentElement.parentElement;
  block.parentElement.nextElementSibling.querySelector(".attach_panel").style.display = "block";
  block.remove();
  remove_file_attach();
})
on('#ajax', 'click', '.good_attach_album_remove', function() {
  block = this.parentElement.parentElement.parentElement;
  block.parentElement.nextElementSibling.querySelector(".attach_panel").style.display = "block";
  block.remove();
  remove_file_attach();
})
on('#ajax', 'click', '.photo_attach_album_remove', function() {
  block = this.parentElement.parentElement.parentElement;
  block.parentElement.nextElementSibling.querySelector(".attach_panel").style.display = "block";
  block.remove();
  remove_file_attach();
})

on('#ajax', 'click', '.good_load_one', function() {
  _this = this;
  data_pk = _this.getAttribute('good-pk');
  data_uuid = _this.getAttribute('good-uuid');
  src = _this.querySelector("img").getAttribute('src');
  title = _this.querySelector(".good_title").innerHTML;

  if (document.body.querySelector(".current_file_dropdown")){
    check_good_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, data_pk) ? null : (good_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, src, data_pk, data_uuid, title), close_create_window())
  } else if (document.body.querySelector(".attach_block")){
    check_good_in_block(document.body.querySelector(".attach_block"), _this, data_pk) ? null : (good_post_attach(document.body.querySelector(".attach_block"), src, data_pk, data_uuid, title), close_create_window())
  } else if (document.body.querySelector(".message_attach_block")){
    check_good_in_block(document.body.querySelector(".message_attach_block"), _this, data_pk) ? null : (good_message_attach(document.body.querySelector(".message_attach_block"), src, data_pk, data_uuid, title), close_create_window())
  }
});
on('#ajax', 'click', '.good_load_several', function() {
  _this = this.previousElementSibling;
  data_pk = _this.getAttribute('good-pk');
  data_uuid = _this.getAttribute('good-uuid');
  src = _this.querySelector("img").getAttribute('src');
  title = _this.querySelector(".good_title").innerHTML;

  if (document.body.querySelector(".current_file_dropdown")){
    check_good_in_block(document.body.querySelector(".current_file_dropdown").parentElement.parentElement.parentElement.previousElementSibling, _this, data_pk) ? null : (good_comment_attach(document.body.querySelector(".current_file_dropdown").parentElement.parentElement, src, data_pk, data_uuid, title), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".attach_block")){
    check_good_in_block(document.body.querySelector(".attach_block"), _this, data_pk) ? null : (good_post_attach(document.body.querySelector(".attach_block"), src, data_pk, data_uuid, title), this.classList.add("active_svg"))
  } else if (document.body.querySelector(".message_attach_block")){
    check_good_in_block(document.body.querySelector(".message_attach_block"), _this, data_pk) ? null : (good_message_attach(document.body.querySelector(".message_attach_block"), src, data_pk, data_uuid, title), this.classList.add("active_svg"))
  }
});

on('#ajax', 'click', '.article_load_one', function() {
  _this = this;
  if (document.body.querySelector(".current_file_dropdown")){
    article_comment_attach(_this, document.body.querySelector(".current_file_dropdown").parentElement.parentElement)
  } else if (document.body.querySelector(".attach_block")){
    article_post_attach(_this, document.body.querySelector(".attach_block"))
  }
  close_create_window()
});
on('#ajax', 'click', '.article_load_several', function() {
  _this = this.previousElementSibling;
  if (document.body.querySelector(".current_file_dropdown")){
    article_comment_attach(_this, document.body.querySelector(".current_file_dropdown").parentElement.parentElement)
  } else if (document.body.querySelector(".attach_block")){
    article_post_attach(_this, document.body.querySelector(".attach_block"))
  }
  this.classList.add("active_svg");
});

on('#ajax', 'click', '.commmunty_load_one', function() {
  _this = this;
  block = _this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  commmunity_form_selected(_this, block.querySelector("#selected_message_target_items"))
});
on('#ajax', 'click', '.chat_item_load_one', function() {
  _this = this;
  block = _this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  chat_item_form_selected(_this, block.querySelector("#selected_message_target_items"))
});
on('#ajax', 'click', '.chat_friends_load_one', function() {
  _this = this;
  block = this.parentElement.parentElement.nextElementSibling;
  chat_item_form_selected(_this, block)
});

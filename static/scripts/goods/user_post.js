
on('#ajax', 'change', '.goods_category', function() {
  var val = this.value;
  if (val == '') {
    document.getElementById('subcat').innerHTML = "";
  } else {
    var link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    link.open( 'GET', "/goods/progs/cat/" + val + "/", true );
    link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    link.onreadystatechange = function () {
      if ( link.readyState == 4 ) {
          if ( link.status == 200 ) {
              var sub = document.getElementById("subcat");
              sub.innerHTML = link.responseText;
          }
      }
  };
  link.send( null );
  };
});

function good_gallery(loader){
  thumb_list = loader.querySelectorAll(".thumb_list li");
  thumb = loader.querySelector(".big_img");
  thumb_list.forEach((item) => {
    item.addEventListener("mouseover", function () {
    image = item.children[0].src;
      thumb.src = image;
    });
  });
}

on('#ajax', 'click', '.u_goodComment', function() {
  form = this.parentElement.parentElement.parentElement;
  send_comment(form, form.parentElement.previousElementSibling, '/goods/user_progs/post-comment/');
});

on('#ajax', 'click', '.u_replyGoodComment', function() {
  form = this.parentElement.parentElement.parentElement.parentElement;
  block = form.parentElement.parentElement.querySelector(".stream_reply_comments");
  send_comment(form, block, '/goods/user_progs/reply-comment/')
  form.parentElement.style.display = "none";
  block.classList.add("replies_open")
});

on('#ajax', 'click', '.u_replyParentGoodComment', function() {
  form = this.parentElement.parentElement.parentElement.parentElement;
  block = form.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  send_comment(form, block.parentElement, '/goods/user_progs/reply-comment/')
  form.parentElement.style.display = "none";
  block.classList.add("replies_open")
});

on('#ajax', 'click', '.u_good_off_comment', function() {
  send_change(this, "/goods/user_progs/off_comment/", "u_good_on_comment", "Вкл. комментарии");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".u_good_comments").style.display = "none"
})
on('#ajax', 'click', '.u_good_on_comment', function() {
  send_change(this, "/goods/user_progs/on_comment/", "u_good_off_comment", "Выкл. комментарии");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".u_good_comments").style.display = "unset"
})

on('#ajax', 'click', '.u_good_comment_delete', function() {
  comment_delete(this, "/goods/user_progs/delete_comment/", "u_good_comment_abort_remove")
})
on('#ajax', 'click', '.u_good_comment_abort_remove', function() {
  comment_abort_delete(this, "/goods/user_progs/abort_delete_comment/")
});

on('#ajax', 'click', '.u_good_off_private', function() {
  send_change(this, "/goods/user_progs/off_private/", "u_good_on_private", "Вкл. приватность")
})
on('#ajax', 'click', '.u_good_on_private', function() {
  send_change(this, "/goods/user_progs/on_private/", "u_good_off_private", "Выкл. приватность")
})

on('#ajax', 'click', '.u_good_edit', function() {
  this.parentElement.nextElementSibling.style.display = "block"
})

on('#ajax', 'click', '.u_good_off_votes', function() {
  send_change(this, "/goods/user_progs/off_votes/", "u_good_on_votes", "Вкл. реакции");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".like").style.display = "none";
  post.querySelector(".dislike").style.display = "none";
})
on('#ajax', 'click', '.u_good_on_votes', function() {
  send_change(this, "/goods/user_progs/on_votes/", "u_good_off_votes", "Выкл. реакции");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  post.querySelector(".like").style.display = "unset";
  post.querySelector(".dislike").style.display = "unset";
})
on('#ajax', 'click', '.u_good_hide', function() {
  send_change(this, "/goods/user_progs/hide/", "u_good_unhide", "Товар не виден");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
})
on('#ajax', 'click', '.u_good_unhide', function() {
  send_change(this, "/goods/user_progs/unhide/", "u_good_hide", "Товар виден");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
})

on('#ajax', 'click', '.user_good_remove', function() {
  send_change(this, "/goods/user_progs/delete/", "user_good_abort_remove", "Отмена");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  this.parentElement.parentElement.nextElementSibling.style.display = "none";
  post.querySelector(".order-2").style.display = "none";
  post.querySelector(".card").style.opacity = "0.5";
  this.style.color = "#FF0000";
})
on('#ajax', 'click', '.user_good_abort_remove', function() {
  send_change(this, "/goods/user_progs/abort_delete/", "user_good_remove", "Удалить");
  post = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  this.parentElement.parentElement.nextElementSibling.style.display = "unset";
  post.querySelector(".order-2").style.display = "unset";
  post.querySelector(".card").style.opacity = "1";
})

on('#ajax', 'click', '.u_good_like', function() {
  block = this.parentElement.parentElement.parentElement.parentElement.parentElement;
  pk = block.getAttribute("data-pk");
  uuid = block.getAttribute("data-uuid");
  send_like(block, "/goods/votes/user_like/" + uuid + "/" + pk + "/");
  like_reload(this.nextElementSibling, this.nextElementSibling.nextElementSibling.nextElementSibling, "u_all_good_likes");
});
on('#ajax', 'click', '.u_good_dislike', function() {
  block = this.parentElement.parentElement.parentElement.parentElement.parentElement;
  pk = block.getAttribute("data-pk");
  uuid = block.getAttribute("data-uuid");
  send_dislike(block, "/goods/votes/user_dislike/" + uuid + "/" + pk + "/");
  dislike_reload(this.previousElementSibling, this.nextElementSibling, "u_all_good_dislikes");
});
on('#ajax', 'click', '.u_good_like2', function() {
  _this = this;
  good = _this.parentElement;
  comment_pk = good.getAttribute("data-pk");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  send_like(good, "/goods/votes/user_comment/" + comment_pk + "/" + pk + "/like/");
  like_reload(this.nextElementSibling, this.nextElementSibling.nextElementSibling.nextElementSibling, "u_all_good_comment_likes")
});
on('#ajax', 'click', '.u_good_dislike2', function() {
  _this = this;
  good = _this.parentElement;
  comment_pk = good.getAttribute("data-pk");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  send_dislike(good, "/goods/votes/user_comment/" + comment_pk + "/" + pk + "/dislike/");
  dislike_reload(this.previousElementSibling, this.nextElementSibling, "u_all_good_comment_dislikes")
});


on('#ajax', 'click', '#good_image', function() {
  img = this.previousElementSibling.querySelector("#id_image")
  get_image_priview(this, img);
});
on('#ajax', 'click', '#good_image2', function() {
  img = this.previousElementSibling.querySelector("#id_image2")
  get_image_priview(this, img);
});
on('#ajax', 'click', '#good_image3', function() {
  img = this.previousElementSibling.querySelector("#id_image3")
  get_image_priview(this, img);
});
on('#ajax', 'click', '#good_image4', function() {
  img = this.previousElementSibling.querySelector("#id_image4")
  get_image_priview(this, img);
});
on('#ajax', 'click', '#good_image5', function() {
  img = this.previousElementSibling.querySelector("#id_image5")
  get_image_priview(this, img);
});
on('#ajax', 'click', '.u_good_add', function() {
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  loader = document.getElementById("create_loader");
  open_fullscreen('/goods/user_progs/add_window/' + pk + '/', loader)
});
on('#ajax', 'click', '#u_good_add_attach', function() {
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  loader = document.getElementById("create_loader");
  open_fullscreen('/goods/user_progs/add_attach/' + pk + '/', loader);
});

on('#ajax', 'click', '#add_good_user_btn', function() {
  form_post = document.body.querySelector("#add_good_user_form");
  form_data = new FormData(form_post);

  lists = form_post.querySelector("#id_album");
  selectedOptions = lists.selectedOptions;
  val = false;
  for (var i = 0; i < selectedOptions.length; i++) {
    if(selectedOptions[i].value) {val = true}
  }
  if (!document.body.querySelector("#id_title").value){
    document.body.querySelector("#id_title").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!");
  } else if (!document.body.querySelector("#category").value){
    document.body.querySelector("#category").style.border = "1px #FF0000 solid";
    toast_error("Категория - обязательное поле!")
  } else if (!document.body.querySelector("#id_description").value){
    document.body.querySelector("#id_description").style.border = "1px #FF0000 solid";
    toast_error("Описание товара - обязательное поле!");
  } else if (!document.body.querySelector("#id_image").value){
    document.body.querySelector("#good_image").style.border = "1px #FF0000 solid !important";
    toast_error("Фотография на обложку обязательна!")
  } else if (!val){
    form_post.querySelector("#id_album").style.border = "1px #FF0000 solid";
    toast_error("Выберите альбом!");
    return
  }
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/goods/user_progs/add/" + pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem = link_.responseText;
    new_good = document.createElement("div");
    new_good.innerHTML = elem;
    if (document.querySelector(".current_file_dropdown")){
      dropdown = document.body.querySelector(".current_file_dropdown").parentElement.parentElement;
      is_full_dropdown();
      img_block = dropdown.parentElement.previousElementSibling;
      data_pk = new_good.querySelector(".new_image").getAttribute('good-pk');

      if (img_block.querySelector( '[good-pk=' + '"' + data_pk + '"]' )){
        new_good.setAttribute("tooltip", "Товар уже выбран");
        new_good.setAttribute("flow", "up");
        return
      };
      new_good.classList.add("attach_toggle");
      title = new_good.querySelector(".good_title").innerHTML;
      if (!img_block.querySelector(".select_good1")){
        div = create_preview_good("select_good1", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)
      } else if (!img_block.querySelector(".select_good2")){
        div = create_preview_good("select_good2", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)
      }
      img_block.append(div);
      img_block.querySelector(".good_input") ? null : ($good_input = document.createElement("span"), $good_input.innerHTML = '<input type="hidden" class="good_input" name="good" value="1">', img_block.append($good_input));

      add_file_dropdown()
      is_full_dropdown();

    } else if (document.querySelector(".attach_block")){
      block = document.body.querySelector(".attach_block");
      is_full_attach();
      data_pk = new_good.querySelector(".new_image").getAttribute('good-pk');
      title = new_good.querySelector(".good_title").innerHTML;

      if (block.querySelector( '[good-pk=' + '"' + data_pk + '"]' )){
        new_good.setAttribute("tooltip", "Товар уже выбран");
        new_good.setAttribute("flow", "up");
        return
      };
      new_good.classList.add("attach_toggle");
      if (!block.querySelector(".good_input")){div = create_preview_good("select_good1", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good2")){div = create_preview_good("select_good2", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good3")){div = create_preview_good("select_good3", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good4")){div = create_preview_good("select_good4", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good5")){div = create_preview_good("select_good5", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good6")){div = create_preview_good("select_good6", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good7")){div = create_preview_good("select_good7", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good8")){div = create_preview_good("select_good8", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good9")){div = create_preview_good("select_good9", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
      else if (!block.querySelector(".select_good10")){div = create_preview_good("select_good10", new_good.querySelector(".img").getAttribute('data-src'), data_pk, title)}
    block.append(div);
    block.querySelector(".good_input") ? null : ($good_input = document.createElement("span"), $good_input.innerHTML = '<input type="hidden" class="good_input" name="good" value="1">', block.append($good_input));

    add_file_attach()
    is_full_attach();
    }
    else {
      new_good.classList.add("col-md-4");
      goods = document.body.querySelector("#user_goods_container");
      goods.prepend(new_good);
      goods.querySelector(".goods_empty") ? goods.querySelector(".goods_empty").style.display = "none" : null;
      toast_info("Товар создан!");
  }
  document.querySelector(".create_fullscreen").style.display = "none";
  document.getElementById("create_loader").innerHTML="";
  toast_info("Товар создан!")
  }};
  link_.send(form_data);
});

on('#ajax', 'click', '#u_ucm_good_repost_btn', function() {
  form_post = document.body.querySelector("#u_uсm_good_repost_form");
  form_data = new FormData(form_post);
  uuid = this.getAttribute("data-uuid");
  pk = this.getAttribute("data-pk");

  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );

  if (form_post.querySelector('#repost_radio_wall').checked) {
    link_.open( 'POST', "/goods/repost/u_u_good_repost/" + pk + "/" + uuid + "/", true );
    link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    link_.send(form_data);
    toast_info("Репост товара на стену сделан")
  }

  else if(form_post.querySelector('#repost_radio_community').checked){
    staff_communities = form_post.querySelector("#id_staff_communities");
    selectedOptions = staff_communities.selectedOptions;
    val = false;
    for (var i = 0; i < selectedOptions.length; i++) {if(selectedOptions[i].value) {val = true}}
    if(val){
      link_.open( 'POST', "/goods/repost/u_c_good_repost/" + pk + "/" + uuid + "/", true );
      link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      link_.send(form_data);
      toast_info("Репост товара в сообщества сделан")
    }else{toast_error("Выберите сообщества для репоста")}
  }

  else if(form_post.querySelector('#repost_radio_message').checked){
    user_connections = form_post.querySelector("#id_user_connections");
    selectedOptions = user_connections.selectedOptions;
    val = false;
    for (var i = 0; i < selectedOptions.length; i++) {if(selectedOptions[i].value) {val = true}}
    if(val){
      link_.open( 'POST', "/goods/repost/u_m_good_repost/" + pk + "/" + uuid + "/", true );
      link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      link_.send(form_data);
      toast_info("Репост товара в сообщения сделан")
    }else{toast_error("Выберите пользователя для репоста")}
  };

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    document.querySelector(".votes_fullscreen").style.display = "none";
    document.getElementById("votes_loader").innerHTML="";
  }}
});

on('#ajax', 'click', '#u_create_good_list_btn', function() {
  this.disabled = true;
  form = document.body.querySelector("#u_good_list_create");
  form_data = new FormData(form);
  if (!form.querySelector("#id_title").value){
    form.querySelector("#id_title").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!");
  } else { null }
  post_and_load_object_page(form, "/goods/user_progs/add_album/", "/users/", "/goods_list/")
});

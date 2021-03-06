on('#ajax', 'click', '.c_add_post_list', function() {
  loader = document.getElementById("create_loader");
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk')
  open_fullscreen("/posts/community_progs/add_list/" + pk + "/", loader)
});
on('#ajax', 'click', '.c_edit_post_list', function() {
  list_pk = this.parentElement.parentElement.getAttribute("list-pk");
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk')
  loader = document.getElementById("create_loader");
  open_fullscreen("/posts/community_progs/edit_list/" + pk + "/" + list_pk + "/", loader)
});

on('#ajax', 'click', '.c_post_list_change', function() {
  if (!this.classList.contains("tab_active")){
    parent = this.parentElement;
    list = parent.querySelectorAll(".list");
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove("tab_active");
      list[i].classList.add("pointer", "c_post_list_change");
    };
    block = parent.parentElement.parentElement.nextElementSibling;
    list_block_load(block, ".post_stream", "/communities/list/" + document.body.querySelector(".pk_saver").getAttribute("data-pk") + "/" + this.getAttribute("list-pk") + "/");
    this.classList.remove("pointer", "c_post_list_change");
    this.classList.add("tab_active");
  }
});

on('#ajax', 'click', '#c_repost_for_community', function() {
  this.parentElement.parentElement.parentElement.parentElement.querySelector("#selected_message_target_items").innerHTML = "";
  current_block = this.parentElement.nextElementSibling;
  current_block.querySelector("#community_append").style.display = "block";
  block = current_block.querySelector("#user_communities_window");
  current_block.querySelector("#chat_items_append").style.display = "none";
  if (!block.querySelector(".load_pag")){
  list_load(block, "/users/load/communities/")
  }
})

on('#ajax', 'click', '.c_fullscreen', function() {
  uuid = this.parentElement.getAttribute('data-uuid');
  this.parentElement.parentElement.parentElement.getAttribute('list-pk') ? pk = this.parentElement.parentElement.parentElement.getAttribute('list-pk') : pk = this.parentElement.getAttribute('list-pk');
  loader = document.getElementById("item_loader");
  open_fullscreen("/communities/post/" + pk + "/" + uuid + "/", loader)
});
on('#ajax', 'click', '.c_fix_fullscreen', function() {
  container = this.parentElement;
  uuid = container.getAttribute('data-uuid');
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  loader = document.getElementById("item_loader");
  open_fullscreen("/communities/fix_post/" + pk + "/" + uuid + "/", loader)
})

on('#ajax', 'click', '.c_ucm_post_repost', function() {
  parent = this.parentElement.parentElement.parentElement.parentElement
  uuid = parent.getAttribute("data-uuid");
  parent.getAttribute('data-pk') ? pk = parent.getAttribute('data-pk') : pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  //document.body.querySelector(".pk_saver") ? pk = document.body.querySelector(".pk_saver").getAttribute('data-pk') : pk = parent.getAttribute('data-pk');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/posts/repost/c_ucm_post_window/" + pk + "/" + uuid + "/", loader);
  clear_attach_block();
})
on('#ajax', 'click', '.c_article_detail', function() {
  var uuid, pk, loader;
  uuid = this.parentElement.getAttribute('data-uuid');
  document.body.querySelector(".pk_saver") ? pk = document.body.querySelector(".pk_saver").getAttribute('data-pk') : pk = this.parentElement.getAttribute('data-pk');
  loader = document.getElementById("article_loader");
  open_fullscreen("/article/read/" + pk + "/" + uuid + "/", loader)
});

on('#ajax', 'click', '.c_all_posts_likes', function() {
  container = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = container.getAttribute('data-uuid');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/posts/item_window/all_community_like/" + uuid + "/", loader)
});
on('#ajax', 'click', '.c_all_posts_dislikes', function() {
  container = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = container.getAttribute('data-uuid');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/posts/item_window/all_community_dislike/" + uuid + "/", loader)
});
on('#ajax', 'click', '.c_all_item_reposts', function() {
  container = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = container.getAttribute('data-uuid');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/posts/item_window/all_community_reposts/" + uuid + "/", loader)
});

on('#ajax', 'click', '.c_all_posts_comment_likes', function() {
  container = this.parentElement.parentElement.parentElement;
  pk = container.getAttribute('data-pk');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/posts/item_window/all_community_comment_like/" + pk + "/", loader)
});
on('#ajax', 'click', '.c_all_posts_comment_dislikes', function() {
  container = this.parentElement.parentElement.parentElement;
  pk = container.getAttribute('data-pk');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/posts/item_window/all_community_comment_dislike/" + pk + "/", loader)
});

on('#ajax', 'click', '.c_item_comments', function() {
  clear_comment_dropdown();
  parent = this.parentElement.parentElement.parentElement.parentElement;
  document.body.querySelector(".pk_saver") ? pk = document.body.querySelector(".pk_saver").getAttribute('data-pk') : pk = parent.getAttribute('data-pk');
  uuid = parent.getAttribute("data-uuid");
  //this.parentElement.parentElement.nextElementSibling.classList.toggle("comments_open");
  url = "/posts/community/comment/" + uuid + "/" + pk + "/";
  list_load(parent.querySelector(".c_load_comments"), url);
  this.classList.toggle("comments_open");
});


on('#ajax', 'click', '.c_comment_photo', function() {
  this.classList.add("current_file_dropdown");
  document.body.querySelector(".attach_block") ? (attach_block = document.body.querySelector(".attach_block"), attach_block.innerHTML = "", attach_block.classList.remove("attach_block")) : null;
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_img_comment_load/', loader)
});
on('#ajax', 'click', '.c_comment_video', function() {
  this.classList.add("current_file_dropdown");
  clear_attach_block();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_video_load/', loader)
});
on('#ajax', 'click', '.c_comment_music', function() {
  this.classList.add("current_file_dropdown");
  clear_attach_block();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_music_load/', loader)
});
on('#ajax', 'click', '.c_comment_good', function() {
  this.classList.add("current_file_dropdown");
  clear_attach_block();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_good_load/', loader)
});
on('#ajax', 'click', '.c_comment_article', function() {
  this.classList.add("current_file_dropdown");
  clear_attach_block();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_article_load/', loader)
});

on('#ajax', 'click', '.c_select_photo', function() {
  this.parentElement.parentElement.previousElementSibling.classList.add("attach_block");
  clear_comment_dropdown();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_img_load/', loader)
});
on('#ajax', 'click', '.c_select_video', function() {
  this.parentElement.parentElement.previousElementSibling.classList.add("attach_block");
  clear_comment_dropdown();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_video_load/', loader)
});
on('#ajax', 'click', '.c_select_music', function() {
  this.parentElement.parentElement.previousElementSibling.classList.add("attach_block");
  clear_comment_dropdown();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_music_load/', loader)
});
on('#ajax', 'click', '.c_select_good', function() {
  this.parentElement.parentElement.previousElementSibling.classList.add("attach_block");
  clear_comment_dropdown();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_good_load/', loader)
});
on('#ajax', 'click', '.c_select_article', function() {
  this.parentElement.parentElement.previousElementSibling.classList.add("attach_block");
  clear_comment_dropdown();
  loader = document.getElementById("create_loader");
  open_fullscreen('/users/load/c_article_load/', loader)
});

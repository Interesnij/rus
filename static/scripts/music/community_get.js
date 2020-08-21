on('#ajax', 'click', '.c_ucm_music_repost', function() {
  parent = this.parentElement;
  track_pk = parent.getAttribute("data-pk");
  parent.getAttribute('community-pk') ? pk = parent.getAttribute('user-pk') : pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/music/repost/c_ucm_music_window/" + pk + "/" + track_pk + "/", loader);
  clear_attach_block();
})
on('#ajax', 'click', '.c_ucm_music_list_repost', function() {
  parent = this.parentElement;
  parent.getAttribute("data-pk") ? pk = parent.getAttribute('data-pk') : pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  parent.getAttribute("data-uuid") ? uuid = parent.getAttribute('data-uuid') : uuid = document.body.querySelector(".pk_saver").getAttribute('data-uuid');
  loader = document.getElementById("votes_loader");
  open_fullscreen("/music/repost/c_ucm_list_window/" + pk + "/" + uuid + "/", loader);
  clear_attach_block();
})
on('#ajax', 'click', '.c_soundcloud_set_create', function() {
  uuid = this.parentElement.getAttribute('data-uuid');
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  loader = document.getElementById("create_loader");
  open_fullscreen("/music/community_progs/souncloud_create_list_window/" + pk + "/", loader)
});
on('#ajax', 'click', '.c_soundcloud_set_list_main', function() {
  uuid = this.parentElement.getAttribute('data-uuid');
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  loader = document.getElementById("create_loader");
  open_fullscreen("/music/community_progs/souncloud_list_window_main/" + pk + "/", loader)
});
on('#ajax', 'click', '.c_soundcloud_set_list', function() {
  uuid = this.parentElement.getAttribute('data-uuid');
  pk = document.body.querySelector(".pk_saver").getAttribute('data-pk');
  loader = document.getElementById("create_loader");
  open_fullscreen("/music/community_progs/souncloud_list_window/" + pk + "/", loader)
});

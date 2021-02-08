on('#ajax', 'click', '.color_change', function() {
  var span = this;
  var color = this.getAttribute('data-color');
  var input = span.querySelector(".custom-control-input");
  var list = document.querySelector(".theme-color");
  var link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'GET', "/users/progs/color/" + color + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link_.send();
  link_.onreadystatechange = function () {
  if ( link_.readyState == 4 && link_.status == 200 ) {
    var uncheck=document.getElementsByTagName('input');
    for(var i=0;i<uncheck.length;i++)
    {uncheck[i].checked=false;}
    input.checked = true;
    addStyleSheets("/static/styles/color/" + color + ".css");
  }
};
});

on('#ajax', 'click', '#info_user_btn', function() {
  send_form_with_pk_and_toast('/users/settings/info/', document.body.querySelector("#info_user_form"), "Изменения приняты!")
});

on('#ajax', 'click', '#user_private_profile_btn', function() {
  send_form_with_pk_and_toast('/users/settings/private/', document.body.querySelector("#user_private_profile_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_private_post_btn', function() {
  send_form_with_pk_and_toast('/users/settings/private_post/', document.body.querySelector("#user_private_post_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_private_photo_btn', function() {
  send_form_with_pk_and_toast('/users/settings/private_photo/', document.body.querySelector("#user_private_photo_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_private_good_btn', function() {
  send_form_with_pk_and_toast('/users/settings/private_good/', document.body.querySelector("#user_private_good_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_private_video_btn', function() {
  send_form_with_pk_and_toast('/users/settings/private_video/', document.body.querySelector("#user_private_video_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_private_music_btn', function() {
  send_form_with_pk_and_toast('/users/settings/private_music/', document.body.querySelector("#user_private_music_form"), "Изменения приняты!")
});

on('#ajax', 'click', '#user_notify_profile_btn', function() {
  send_form_with_pk_and_toast('/users/settings/notify/', document.body.querySelector("#user_notify_profile_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_notify_post_btn', function() {
  send_form_with_pk_and_toast('/users/settings/notify_post/', document.body.querySelector("#user_notify_post_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_notify_photo_btn', function() {
  send_form_with_pk_and_toast('/users/settings/notify_photo/', document.body.querySelector("#user_notify_photo_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_notify_good_btn', function() {
  send_form_with_pk_and_toast('/users/settings/notify_good/', document.body.querySelector("#user_notify_good_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_notify_video_btn', function() {
  send_form_with_pk_and_toast('/users/settings/notify_video/', document.body.querySelector("#user_notify_video_form"), "Изменения приняты!")
});
on('#ajax', 'click', '#user_notify_music_btn', function() {
  send_form_with_pk_and_toast('/users/settings/notify_music/', document.body.querySelector("#user_notify_music_form"), "Изменения приняты!")
});

on('#ajax', 'click', '.edit_user_name', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/edit_name/", loader)
});
on('#ajax', 'click', '.edit_user_password', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/edit_password/", loader)
});
on('#ajax', 'click', '.edit_user_email', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/edit_email/", loader)
});
on('#ajax', 'click', '.edit_user_phone', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/edit_phone/", loader)
});
on('#ajax', 'click', '.edit_user_custom_link', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/edit_link/", loader)
});
on('#ajax', 'click', '.user_identified_send', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/identify_send/", loader)
});
on('#ajax', 'click', '.user_verified_send', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/verify_send/", loader)
});
on('#ajax', 'click', '.remove_user_profile', function() {
  loader = document.getElementById("create_loader");
  open_fullscreen("/users/settings/remove_profile/", loader)
});


on('#ajax', 'click', '.c_comments.comments_close', function() {
  parent = this.parentElement.parentElement.parentElement.parentElement;
  container = parent.querySelector(".load_comments");
  pk = parent.parentElement.getAttribute("community-pk");
  uuid = parent.getAttribute("item-uuid");
  container = parent.querySelector(".load_comments");
  _this = parent.querySelector(".c_comments");
  _this.classList.add("comments_open");
  _this.classList.remove("comments_close");
  url = "/community/comment/" + uuid + "/" + pk + "/";
  list_load(container, url);
});

on('#ajax', 'click', 'comments_open', function() {
  console.log("click!");
  parent = this.parentElement.parentElement.parentElement;
  container = parent.querySelector(".load_comments");
  container.innerHTML="";
  _this = parent.querySelector(".c_comments");
  _this.classList.add("comments_close");
  _this.classList.remove("comments_open");
});


on('#ajax', 'click', '.community_fullscreen_hide', function() {document.querySelector(".community_fullscreen").style.display = "none";document.getElementById("community_loader").innerHTML=""});
on('#ajax', 'click', '.community_manage_fullscreen_hide', function() {document.querySelector(".manage_window_fullscreen").style.display = "none";document.getElementById("load_staff_window").innerHTML=""});

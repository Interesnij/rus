function clear_message_attach_block(){
  document.body.querySelector(".message_attach_block") ? (a_b = document.body.querySelector(".message_attach_block"), a_b.innerHTML = "", a_b.classList = "", a_b.classList.add("files_0"), a_b.classList.remove("message_attach_block")) : null;
}

function is_full_message_attach(){
  files_block = document.body.querySelector(".message_attach_block");
  if (files_block.classList.contains("files_10")){
    files_block.parentElement.querySelector(".message_dropdown").style.display = "none";
    close_create_window()
  }
  else {
    files_block.parentElement.querySelector(".message_dropdown").style.display = "block"
}
}
function add_file_message_attach(){
  files_block = document.body.querySelector(".message_attach_block");
  if (files_block.classList.contains("files_0")){ files_block.classList.add("files_1"), files_block.classList.remove("files_0")}
  else if (files_block.classList.contains("files_1")){ files_block.classList.add("files_2"), files_block.classList.remove("files_1")}
  else if (files_block.classList.contains("files_2")){ files_block.classList.add("files_3"), files_block.classList.remove("files_2")}
  else if (files_block.classList.contains("files_3")){ files_block.classList.add("files_4"), files_block.classList.remove("files_3")}
  else if (files_block.classList.contains("files_4")){ files_block.classList.add("files_5"), files_block.classList.remove("files_4")}
  else if (files_block.classList.contains("files_5")){ files_block.classList.add("files_6"), files_block.classList.remove("files_5")}
  else if (files_block.classList.contains("files_6")){ files_block.classList.add("files_7"), files_block.classList.remove("files_6")}
  else if (files_block.classList.contains("files_7")){ files_block.classList.add("files_8"), files_block.classList.remove("files_7")}
  else if (files_block.classList.contains("files_8")){ files_block.classList.add("files_9"), files_block.classList.remove("files_8")}
  else if (files_block.classList.contains("files_9")){ files_block.classList.add("files_10"), files_block.classList.remove("files_9")}
}
function remove_file_message_attach(){
  files_block = document.body.querySelector(".message_attach_block");
  if (files_block.classList.contains("files_1")){ files_block.classList.add("files_0"), files_block.classList.remove("files_1")}
  else if (files_block.classList.contains("files_2")){ files_block.classList.add("files_1"), files_block.classList.remove("files_2")}
  else if (files_block.classList.contains("files_3")){ files_block.classList.add("files_2"), files_block.classList.remove("files_3")}
  else if (files_block.classList.contains("files_4")){ files_block.classList.add("files_3"), files_block.classList.remove("files_4")}
  else if (files_block.classList.contains("files_5")){ files_block.classList.add("files_4"), files_block.classList.remove("files_5")}
  else if (files_block.classList.contains("files_6")){ files_block.classList.add("files_5"), files_block.classList.remove("files_6")}
  else if (files_block.classList.contains("files_7")){ files_block.classList.add("files_6"), files_block.classList.remove("files_7")}
  else if (files_block.classList.contains("files_8")){ files_block.classList.add("files_7"), files_block.classList.remove("files_8")}
  else if (files_block.classList.contains("files_9")){ files_block.classList.add("files_8"), files_block.classList.remove("files_9")}
  else if (files_block.classList.contains("files_10")){ files_block.classList.add("files_9"), files_block.classList.remove("files_10")}
}

function photo_message_attach(block, photo_pk, user_pk, src) {
  is_full_message_attach();
  div = create_preview_photo(src, photo_pk, user_pk);
  block.append(div);
  add_file_message_attach()
  is_full_message_attach();
}

function photo_message_upload_attach(photo_list, block, block_divs_length){
  is_full_message_attach();
  for (var i = 0; i < block_divs_length; i++){
    parent = photo_list[i];
    div = create_preview_photo(parent.getAttribute('data-href'), parent.getAttribute("photo-pk"), parent.getAttribute("data-pk"));
    add_file_message_attach();
    block.append(div);
    is_full_message_attach();
  };
  close_create_window()
  }


function video_message_attach(block, pk, counter, src) {
  is_full_message_attach();
  div = create_preview_video(src, pk, counter)
  block.append(div);
  add_file_message_attach()
  is_full_message_attach();
}

function music_message_attach(block, pk, counter, src) {
  is_full_message_attach();
  div = create_preview_music(src, pk, counter)
  block.append(div);
  add_file_message_attach()
  is_full_message_attach();
}

function doc_message_attach(block, media_block, pk) {
  is_full_message_attach();
  div = create_preview_doc(media_block, pk)
  block.append(div);
  add_file_message_attach()
  is_full_message_attach();
}

function good_message_attach(block, src, pk, uuid, title) {
  is_full_message_attach();
  div = create_preview_good(src, pk, uuid, title)
  block.append(div);
  add_file_message_attach()
  is_full_message_attach();
}

function article_message_attach(_this, block) {
  is_full_message_attach();
  div = create_preview_article(_this.querySelector("img").getAttribute('data-src'), uuid, title)
  block.append(div);
  add_file_message_attach()
  is_full_message_attach();
}

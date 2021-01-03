on('#ajax', 'click', '#u_ucm_doc_repost_btn', function() {
  repost_constructor(this,
                     "/docs/repost/u_u_doc_repost/",
                     "Репост документа на стену сделан",
                     "/docs/repost/u_c_doc_repost/",
                     "Репост документа в сообщества сделан",
                     "/docs/repost/u_m_doc_repost/",
                     "Репост документа в сообщения сделан")
});
on('#ajax', 'click', '#u_ucm_doc_list_repost_btn', function() {
  repost_constructor(this,
                     "/docs/repost/u_u_doc_list_repost/",
                     "Репост списка документов на стену сделан",
                     "/docs/repost/u_c_doc_list_repost/",
                     "Репост списка документов в сообщества сделан",
                     "/docs/repost/u_m_doc_list_repost/",
                     "Репост списка документов в сообщения сделан")
});

on('#ajax', 'click', '.u_add_doc_in_list', function() {
  _this = this;
  parent = _this.parentElement;
  uuid = parent.getAttribute("data-uuid");
  pk = _this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-pk");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', '/docs/user_progs/u_add_doc_in_list/' + pk + "/" + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    list = parent.querySelector(".u_add_doc_in_list");
    list.style.paddingLeft = "14px";
    list.classList.add("u_remove_doc_in_list");
    list.classList.remove("u_add_doc_in_list");
    span = document.createElement("span");
    span.innerHTML = '<svg fill="currentColor" style="width:15px;height:15px;" class="svg_default" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg> ';
    list.prepend(span)
  }};
  link.send( null );
})
on('#ajax', 'click', '.u_remove_doc_in_list', function() {
  _this = this;
  parent = _this.parentElement;
  uuid = parent.getAttribute("data-uuid");
  pk = _this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-pk");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', '/docs/user_progs/u_remove_doc_in_list/' + pk + "/" + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    list = parent.querySelector(".u_remove_doc_in_list");
    list.style.paddingLeft = "30px";
    list.classList.add("u_add_doc_in_list");
    list.classList.remove("u_remove_doc_in_list");
    list.querySelector("svg").remove();
  }};
  link.send( null );
})

on('#ajax', 'click', '#u_create_doc_btn', function() {
  form = document.querySelector("#u_doc_create");
  form_data = new FormData(form);

  lists = form.querySelector("#id_list");
  selectedOptions = lists.selectedOptions;
  val = false;
  for (var i = 0; i < selectedOptions.length; i++) {
    if(selectedOptions[i].value) {val = true}
  }

  if (!form.querySelector("#id_title").value){
    form.querySelector("#id_title").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!")
  } else if (!val){
    form.querySelector("#id_list").style.border = "1px #FF0000 solid";
    toast_error("Выберите список!")
  }
  else if (!form.querySelector("#id_file").value){
    form.querySelector("#id_file").style.border = "1px #FF0000 solid";
    toast_error("Загрузите документ!")
  } else { this.disabled = true }
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  uuid = document.body.querySelector(".pk_saver").getAttribute("data-uuid");
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', "/docs/user_progs/create_doc/" + pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem = link_.responseText;
    response = document.createElement("span");
    response.innerHTML = elem;
    span1 = response.querySelector('.span1')
    if (span1.classList.contains(uuid)){
      container = document.body.querySelector(".profile_block_paginate");
      container.insertAdjacentHTML('afterBegin', response.innerHTML);
      container.querySelector(".doc_empty") ? container.querySelector(".doc_empty").style.display = "none" : null;
      toast_info("Документ создан!")
    } else{
      toast_info("Документ создан!")
    }
    close_create_window();
  }};

  link_.send(form_data);
});

on('#ajax', 'click', '#u_create_doc_list_btn', function() {
  form = document.body.querySelector("#u_doc_list_create");
  form_data = new FormData(form);
  if (!form.querySelector("#id_name").value){
    form.querySelector("#id_name").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!");
  } else { this.disabled = true }
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'POST', "/docs/user_progs/create_list/" + pk + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        elem_ = document.createElement('span');
        elem_.innerHTML = ajax_link.responseText;
        ajax = elem_.querySelector("#reload_block");
        rtr = document.getElementById('ajax');
        rtr.innerHTML = ajax.innerHTML;
        window.scrollTo(0,0);
        document.title = elem_.querySelector('title').innerHTML;

        uuid = rtr.querySelector(".pk_saver").getAttribute("data-uuid");
        window.history.pushState(null, "vfgffgfgf", '/users/' + pk + "/" + 'doc_list/' + uuid + '/');
      }
    }
    ajax_link.send(form_data);
});

on('#ajax', 'click', '#u_edit_doclist_btn', function() {
  form = document.body.querySelector("#u_edit_doclist_form");
  form_data = new FormData(form);
  if (!form.querySelector("#id_name").value){
    form.querySelector("#id_name").style.border = "1px #FF0000 solid";
    toast_error("Название - обязательное поле!");
  } else { this.disabled = true }

  pk = form.getAttribute("data-pk");
  uuid = form.getAttribute("data-uuid");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'POST', "/docs/user_progs/edit_list/" + pk + "/" + uuid + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        name = form.querySelector('#id_name').value;
        document.body.querySelector(".list_name").innerHTML = name;
        close_create_window();
        toast_success("Список документов изменен")
      }
    }
    ajax_link.send(form_data);
});

on('#ajax', 'click', '.u_doc_list_delete', function() {
  saver = document.querySelector(".pk_saver");
  pk = saver.getAttribute("data-pk");
  uuid = saver.getAttribute("data-uuid");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', "/docs/user_progs/delete_list/" + pk + "/" + uuid + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        this_page_reload("/users/" + pk + "/doc_list/" + uuid + "/")
      }
    }
    ajax_link.send();
});

on('#ajax', 'click', '.u_doc_list_recover', function() {
  saver = document.querySelector(".pk_saver");
  pk = saver.getAttribute("data-pk");
  uuid = saver.getAttribute("data-uuid");

  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', "/docs/user_progs/abort_delete_list/" + pk + "/" + uuid + "/", true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        this_page_reload("/users/" + pk + "/doc_list/" + uuid + "/")
      }
    }
    ajax_link.send();
});

function like_reload(like_block, dislike_block, _class){
  userpic = document.body.querySelector(".userpic");
  userpic.querySelector("img") ? user_img = userpic.querySelector("img").getAttribute("data-src") : user_img = '<svg fill="currentColor" class="svg_default svg_default_50" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
  user_name = userpic.getAttribute("data-name");
  user_pk = document.body.querySelector(".userpic").getAttribute("data-pk");

  if (!like_block.querySelector('figure')){
    console.log("создаем блок лайков");
    $div = document.createElement("div");
    $a = document.createElement("a");
    $a.style.paddingRight = "10px";
    $a.setAttribute("data-pk", user_pk);
    $span1 = document.createElement("span");
    $span1.classList.add(_class, "pointer");
    $span1.innerHTML = "Одобрил 1 человек";
    $span2 = document.createElement("span");
    $span2.style.display = "flex";
    $span2.style.marginTop = "10px";
    $img = document.createElement("img");
    $img.src = user_img;
    $img.style.borderRadius = "50%";
    $figure = document.createElement("figure");
    $figure.style.margin = "0";
    $figure.title = user_name;
    $figure.append($img)
    $a.append($figure);
    $span2.append($a);
    $div.append($span1);
    $div.append($span2);
    $div.style.margin = "15px";
    like_block.append($div)
  }
  else if (like_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' )){
        like_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' ).remove()
      if (!like_block.querySelector('figure')) {
        like_block.innerHTML = ""
        console.log("удаляем блок лайков");
      } else {
        value = like_block.querySelector('[data-count=like]').innerHTML;
        value = value*1;
        value -= 1;
        like_block.querySelector('.pointer').innerHTML = "Всего одобрили :<span data-count='like'> " + value + "</span>";
        console.log("удаляем пользователя из лайков");
      }
  }
  else {
      all_likes = like_block.querySelector('.pointer');
      $a = document.createElement("a");
      $a.style.paddingRight = "10px";
      $a.setAttribute("data-pk", user_pk);
      $img = document.createElement("img");
      $img.src = user_img;
      $img.style.borderRadius = "50%";
      $figure = document.createElement("figure");
      $figure.style.margin = "0";
      $figure.title = user_name;
      $figure.append($img)
      $a.append($figure);
      all_likes.nextElementSibling.prepend($a);
      value = all_likes.querySelector('[data-count=like]').innerHTML;
      value = value*1;
      value += 1;
      like_block.querySelector('.pointer').innerHTML = "Всего одобрили :<span data-count='like'> " + value + "</span>";
      console.log("создаем пользователя в лайках")
  }
  if (dislike_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' )){
    dislike_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' ).remove();
    if (!dislike_block.querySelector('figure')){
      dislike_block.innerHTML = ""
    } else {
    value = dislike_block.querySelector('[data-count=dislike]').innerHTML;
    value = value*1;
    value -= 1;
    dislike_block.querySelector('.pointer').innerHTML = "Всего не одобрили :<span data-count='dislike'> " + value + "</span>";
  }
    console.log("удаляем пользователя из дизлайков")
  }
}
function dislike_reload(like_block, dislike_block, _class){
  userpic = document.body.querySelector(".userpic");
  userpic.querySelector("img") ? user_img = userpic.querySelector("img").getAttribute("data-src") : user_img = '<svg fill="currentColor" class="svg_default svg_default_50" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
  user_name = userpic.getAttribute("data-name");
  user_pk = document.body.querySelector(".userpic").getAttribute("data-pk");

  if (!dislike_block.querySelector('figure')){
    console.log("создаем блок дизлайков");
    $div = document.createElement("div");
    $a = document.createElement("a");
    $a.style.paddingRight = "10px";
    $a.setAttribute("data-pk", user_pk);
    $span1 = document.createElement("span");
    $span1.classList.add(_class, "pointer");
    $span1.innerHTML = "Не одобрил 1 человек";
    $span2 = document.createElement("span");
    $span2.style.display = "flex";
    $span2.style.marginTop = "10px";
    $img = document.createElement("img");
    $img.src = user_img;
    $img.style.borderRadius = "50%";
    $figure = document.createElement("figure");
    $figure.style.margin = "0";
    $figure.title = user_name;
    $figure.append($img)
    $a.append($figure);
    $span2.append($a);
    $div.append($span1);
    $div.append($span2);
    $div.style.margin = "15px";
    dislike_block.append($div)
  }
  else if (dislike_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' )){
        dislike_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' ).remove()
      if (!dislike_block.querySelector('figure')) {
        dislike_block.innerHTML = ""
        console.log("удаляем блок дизлайков");
      } else {
        value = dislike_block.querySelector('[data-count=dislike]').innerHTML;
        value = value*1;
        value -= 1;
        dislike_block.querySelector('.pointer').innerHTML = "Всего не одобрили :<span data-count='like'> " + value + "</span>";
        console.log("удаляем пользователя из дизлайков");
      }
  }
  else {
      all_dislikes = dislike_block.querySelector('.pointer');
      $a = document.createElement("a");
      $a.style.paddingRight = "10px";
      $a.setAttribute("data-pk", user_pk);
      $img = document.createElement("img");
      $img.src = user_img;
      $img.style.borderRadius = "50%";
      $figure = document.createElement("figure");
      $figure.style.margin = "0";
      $figure.title = user_name;
      $figure.append($img)
      $a.append($figure);
      all_dislikes.nextElementSibling.prepend($a);
      value = all_dislikes.querySelector('[data-count=dislike]').innerHTML;
      value = value*1;
      value += 1;
      dislike_block.querySelector('.pointer').innerHTML = "Всего не одобрили :<span data-count='dislike'> " + value + "</span>";
      console.log("создаем пользователя в дизлайках")
  }
  if (like_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' )){
    like_block.querySelector( '[data-pk=' + '"' + user_pk + '"' + ']' ).remove();
    if (!like_block.querySelector('figure')){
      like_block.innerHTML = ""
    } else{
    value = like_block.querySelector('[data-count=like]').innerHTML;
    value = value*1;
    value -= 1
    like_block.querySelector('.pointer').innerHTML = "Всего одобрили :<span data-count='like'> " + value + "</span>";
  }
  console.log("удаляем пользователя из дизлайков")
  }
}

function send_form_with_pk_and_toast(url, form, toast){
    form_data = new FormData(form);
    ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'POST', url, true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
          toast_info(toast);
      }
    }
    ajax_link.send(form_data);
}

function send_with_pk_and_reload(url){
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'GET', url + pk + "/", true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    this_page_reload(document.location.href);
  }};
  link_.send();
}

function comment_delete(_this, _link, _class){
  data = _this.parentElement.parentElement;
  comment_pk = data.getAttribute("data-pk");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + comment_pk + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    comment = data.parentElement.parentElement.parentElement.parentElement;
    comment.style.display = "none";
    div = document.createElement("div");
    div.classList.add("media", "comment");

    div.innerHTML = "<p class='" + _class + "'style='cursor:pointer;text-decoration:underline;padding:15px' data-pk='" + comment_pk + "'>Комментарий удален. Восстановить</p>";
    comment.parentElement.insertBefore(div, comment);
    comment.style.display = "none";
  }};
  link.send( );
}
function comment_wall_delete(_this, _link, _class){
  data = _this.parentElement.parentElement;
  comment_pk = data.getAttribute("data-pk");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + pk + "/" + comment_pk + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    comment = data.parentElement.parentElement.parentElement.parentElement;
    comment.style.display = "none";
    div = document.createElement("div");
    div.classList.add("media", "comment");

    div.innerHTML = "<p class='" + _class + "'style='cursor:pointer;text-decoration:underline;padding:15px' data-pk='" + comment_pk + "'>Комментарий удален. Восстановить</p>";
    comment.parentElement.insertBefore(div, comment);
    comment.style.display = "none";
  }};
  link.send( );
}

function comment_abort_delete(_this, _link){
  comment = _this.parentElement.nextElementSibling;
  comment.style.display = "flex";
  pk = _this.getAttribute("data-pk");
  block = _this.parentElement;
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + pk + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    block.remove();
  }};
  link.send();
}
function comment_wall_abort_delete(_this, _link){
  comment = _this.parentElement.nextElementSibling;
  comment.style.display = "flex";
  comment_pk = _this.getAttribute("data-pk");
  pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
  block = _this.parentElement;
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + pk + "/" + comment_pk + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    block.remove();
  }};
  link.send();
}

function send_change(span, _link, new_class, html){
  parent = span.parentElement;
  item = span.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = item.getAttribute("data-uuid");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    new_span = document.createElement("span");
    new_span.classList.add(new_class, "dropdown-item");
    new_span.innerHTML = html;
    parent.innerHTML = "";
    parent.append(new_span);
  }};
  link.send( null );
}

function send_photo_change(span, _link, new_class, html){
  parent = span.parentElement;
  item = span.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  uuid = item.getAttribute("data-uuid");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + uuid + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    new_span = document.createElement("a");
    new_span.classList.add(new_class);
    new_span.innerHTML = html;
    parent.innerHTML = "";
    parent.append(new_span);
  }};
  link.send( null );
}

loadScripts('/static/scripts/functions/preview.js')
loadScripts('/static/scripts/functions/comment_attach.js')
loadScripts('/static/scripts/functions/post_attach.js')
loadScripts('/static/scripts/functions/reload.js')

class ToastManager {
	constructor(){
		this.id = 0;
		this.toasts = [];
		this.icons = {
			'SUCCESS': "",
			'ERROR': '',
			'INFO': '',
			'WARNING': '',
		};

		var body = document.querySelector('#ajax');
		this.toastsContainer = document.createElement('div');
		this.toastsContainer.classList.add('toasts', 'border-0');
		body.appendChild(this.toastsContainer);
	}

	showSuccess(message) {
		return this._showToast(message, 'SUCCESS');
	}
	showError(message) {
		return this._showToast(message, 'ERROR');
	}
	showInfo(message) {
		return this._showToast(message, 'INFO');
	}
	showWarning(message) {
		return this._showToast(message, 'WARNING');
	}
	_showToast(message, toastType) {
		var newId = this.id + 1;

		var newToast = document.createElement('div');
		newToast.style.display = 'inline-block';
		newToast.classList.add(toastType.toLowerCase());
		newToast.classList.add('toast');
		newToast.innerHTML = `
			<progress max="100" value="0"></progress>
			<h3> ${message} </h3>`;
		var newToastObject = {
			id: newId,
			message,
			type: toastType,
			timeout: 4000,
			progressElement: newToast.querySelector('progress'),
			counter: 0,
			timer: setInterval(() => {
				newToastObject.counter += 1000 / newToastObject.timeout;
				newToastObject.progressElement.value = newToastObject.counter.toString();
        if(newToastObject.counter >= 100) {
					newToast.style.display = 'none';
					clearInterval(newToastObject.timer);
					this.toasts = this.toasts.filter((toast) => {
						return toast.id === newToastObject.id;
					});
				}
			}, 10)
		}

		newToast.addEventListener('click', () => {
			newToast.style.display = 'none';
			clearInterval(newToastObject.timer);
			this.toasts = this.toasts.filter((toast) => {
				return toast.id === newToastObject.id;
			});
		});

		this.toasts.push(newToastObject);
		this.toastsContainer.appendChild(newToast);
		return this.id++;
	}
}
function toast_success(text){
	var toasts = new ToastManager();
	toasts.showSuccess(text);
}
function toast_error(text){
	var toasts = new ToastManager();
	toasts.showError(text);
}
function toast_info(text){
	var toasts = new ToastManager();
	toasts.showInfo(text);
}
function toast_warning(text){
	var toasts = new ToastManager();
	toasts.showWarning(text);
}

function elementInViewport(el){var bounds = el.getBoundingClientRect();return ((bounds.top + bounds.height > 0) && (window.innerHeight - bounds.top > 0));}
function on(elSelector,eventName,selector,fn) {var element = document.querySelector(elSelector);element.addEventListener(eventName, function(event) {var possibleTargets = element.querySelectorAll(selector);var target = event.target;for (var i = 0, l = possibleTargets.length; i < l; i++) {var el = target;var p = possibleTargets[i];while(el && el !== element) {if (el === p) {return fn.call(p, event);}el = el.parentNode;}}});};

function send_comment(form, block, link){
  form_comment = new FormData(form);
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', link, true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	(form.querySelector(".text-comment").value || form.querySelector(".img_block").firstChild) ? null : toast_error("Напишите или прикрепите что-нибудь");
  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    form.querySelector(".form-control-rounded").value="";
    elem = link_.responseText;
    new_post = document.createElement("span");
    new_post.innerHTML = elem;
		block.append(new_post);
		toast_success(" Комментарий опубликован");
    form.querySelector(".img_block").innerHTML = "";
    try{form_dropdown = form.querySelector(".current_file_dropdown");form_dropdown.classList.remove("current_file_dropdown");form_dropdown.parentElement.parentElement.classList.remove("files_one", "files_two");form_dropdown.parentElement.parentElement.classList.add("files_null")}catch { null }
  }};

  link_.send(form_comment);
}

function load_chart() {
  try{
var ctx = document.getElementById('canvas');
var dates = ctx.getAttribute('data-dates').split(",");
var data_1 = ctx.getAttribute('data-data_1').split(",");
var data_2 = ctx.getAttribute('data-data_2').split(",");
var label_1 = ctx.getAttribute('data-label_1');
var label_2 = ctx.getAttribute('data-label_2');

var config = {
type: 'line',
data: {
  labels: dates,
  datasets: [{
    label: label_1,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: data_1,
    fill: false,
  }, {
    label: label_2,
    fill: false,
    backgroundColor: 'rgb(54, 162, 235)',
    borderColor: 'rgb(54, 162, 235)',
    data: data_2,
  }]
},
options: {
  responsive: true,
  title: {display: true,text: ''},
  tooltips: {mode: 'index',intersect: false,},
  hover: {mode: 'nearest',intersect: true},
  scales: {
  xAxes: [{display: true,scaleLabel: {display: true,labelString: ''}}],
  yAxes: [{display: true,scaleLabel: {display: true,labelString: ''}}]
  }
}
};

ctx.getContext('2d');window.myLine = new Chart(ctx, config);
}catch{return}
}

function addStyleSheets (href) {
  $head = document.head,
  $link = document.createElement('link');
  $link.rel = 'stylesheet';
  $link.classList.add("my_color_settings");
  $link.href = href;
  $head.appendChild($link);
}

function open_fullscreen(url, block) {
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', url, true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem = link.responseText;
    block.parentElement.style.display = "block";
    block.innerHTML = elem
  }};
  link.send();
}

function send_like(item, link){
  like = item.querySelector(".like");
  dislike = item.querySelector(".dislike");
  link__ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link__.overrideMimeType("application/json");
  link__.open( 'GET', link, true );
  link__.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link__.onreadystatechange = function () {
  if ( link__.readyState == 4 && link__.status == 200 ) {
    jsonResponse = JSON.parse(link__.responseText);
    likes_count = item.querySelector(".likes_count");
    dislikes_count = item.querySelector(".dislikes_count");
    likes_count.innerHTML = jsonResponse.like_count;
    dislikes_count.innerHTML = jsonResponse.dislike_count;
    like.classList.toggle("btn_success");
    like.classList.toggle("btn_default");
    dislike.classList.add("btn_default");
    dislike.classList.remove("btn_danger");
  }};
  link__.send( null );
}

function send_dislike(item, link){
  like = item.querySelector(".like");
  dislike = item.querySelector(".dislike");
  link__ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link__.overrideMimeType("application/json");
  link__.open( 'GET', link, true );
  link__.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link__.onreadystatechange = function () {
  if ( link__.readyState == 4 && link__.status == 200 ) {
    jsonResponse = JSON.parse(link__.responseText);
    likes_count = item.querySelector(".likes_count");
    dislikes_count = item.querySelector(".dislikes_count");
    likes_count.innerHTML = jsonResponse.like_count;
    dislikes_count.innerHTML = jsonResponse.dislike_count;
    dislike.classList.toggle("btn_danger");
    dislike.classList.toggle("btn_default");
    like.classList.add("btn_default");
    like.classList.remove("btn_success");
  }};
  link__.send( null );
}


    function get_image_priview(ggg, img) {
    entrou = false;
    img.click();

    img.onchange = function() {
      if (!entrou) {imgPath = img.value;
        extn = imgPath.substring(imgPath.lastIndexOf(".") + 1).toLowerCase();
      if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg")
      {if (typeof FileReader != "undefined") {
        if (ggg){

        }
        ggg.innerHTML = "";
        reader = new FileReader();
        reader.onload = function(e) {
          $img = document.createElement("img");
          $img.id = "targetImageCrop";
          $img.src = e.target.result;
          $img.class = "thumb-image";
          ggg.innerHTML = '<a href="#" style="position: absolute;right:15px;top: 0;" class="delete_thumb">Удалить</a>'
          ggg.append($img);
          };
          reader.readAsDataURL(img.files[0]);
        }
      } else { this.value = null; }
    } entrou = true;
    setTimeout(function() { entrou = false; }, 1000);
    }};
load_chart()

$('#ajax').on('click', '.c_add_post', function() {
  var btn = $(this); var pk = btn.data('pk'); var frm_post = $('#COMM-POST'); var stream = frm_post.parent().next();
      $.ajax({
          type: frm_post.attr('method'), url: "/posts/add_post_community/" + pk + "/", data: frm_post.serialize(),
          success: function(data) {
              stream.prepend(data); stream.find(".post_empty").hide(); $(".id_text").val(""); $(".add_board #for_images_upload").hide(); $(".add_board #for_gallery").hide(); $(".add_board #for_doc").hide(); $(".add_board #for_good").hide(); $(".add_board #for_question").hide(); $(".add_board #for_settings").hide();
              $.toast({heading: 'Успешно',text: 'Запись успешно создана!',showHideTransition: 'fade',icon: 'success'})},
          error: function(data) {
              $.toast({heading: 'Ошибка',text: 'Для публикации записи нужно написать что-нибудь и/или вставить изображение(ия)',showHideTransition: 'fade',icon: 'error'})
          }

      }); return false;
  });

$('#ajax').on('click', '#community_article_add', function() {
  var btn = $(this); var pk = btn.data('pk');
  $('#article_loader').html('').load("/article/add_community/" + pk + "/");
  $('.article_fullscreen').show();
})
$('.article_fullscreen_hide').on('click', function() {$('.article_fullscreen').hide(); $('#article_loader').empty();});
$('#images_upload').on('click', function() {$('#for_images_upload').show();});
$('#settings').on('click', function() {$('#for_settings').show();});
$('#gallery').on('click', function() {$('#for_gallery').show();});
$('#doc').on('click', function() {$('#for_doc').show();});
$('#good').on('click', function() {$('#for_good').show();});
$('#question').on('click', function() {$('#for_question').show();});

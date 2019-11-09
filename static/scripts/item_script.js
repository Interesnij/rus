$('#ajax .stream').on('click', '.article_detail', function () {
	 var item = $(this);
	 var item_id = item.data("id");
	 $('#article_loader').html('').load("/article/detail/" + item_id)
	 $('.article_fullscreen').show();
});

$('#ajax').on('click', '.comment', function () {
	var item = $(this).closest(".infinite-item").attr("item-id");
	var url = $(this).parents(".infinite-item");
	$.ajax({
			url: "/main/comment/" + item + "/",
			data: {'item': item},
			cache: false,
			beforeSend: function () {
					url.find(".load_comments").html("<span style='display:flex;justify-content: center;'><img src='/static/images/loading.gif'></span>");
			},
			success: function (data) {
				url.find(".load_comments").html(data.comments);
			}
	});
	return false;
});

$('#ajax').on('click', '.remove', function () {
var remove = $(this);
var pk = remove.data('id');
$.ajax({
	url: "/users/delete/" + pk + "/",
	success: function (data) {
		$(remove).parents('.card').hide();
    $('.activefullscreen').hide();
		$.toast({
				heading: 'Информация',
				text: 'Запись успешно удалена!',
				showHideTransition: 'fade',
				icon: 'info'
		})
	},
	error: function(data) {
	}
});
});


$('#ajax').on('click', '.fullscreen', function () {
	 var item = $(this);
	 var item_id = item.data("id");
	 $('#item_loader').html('').load("/users/item/" + item_id)
	 $('.item_fullscreen').show();
});


$('#ajax').on('click', '.fixed', function () {
var fixed = $(this);
var pk = fixed.parent().data('id');
$.ajax({
	url: "/users/fixed/" + pk + "/",
	success: function (data) {
		fixed.parent().html("<span style='cursor:pointer' class='dropdown-item unfixed'>Открепить</span>");
		$.toast({
				heading: 'Информация',
				text: 'Запись закреплена!',
				showHideTransition: 'fade',
				icon: 'info'
		})
	}
});
});

$('#ajax').on('click', '.unfixed', function () {
var unfixed = $(this);
var pk = unfixed.parent().data('id');
$.ajax({
	url: "/users/unfixed/" + pk + "/",
	success: function (data) {
		unfixed.parent().html("<span style='cursor:pointer' class='dropdown-item fixed'>Закрепить</span>");
		$.toast({
				heading: 'Информация',
				text: 'Запись откреплена!',
				showHideTransition: 'fade',
				icon: 'info'
		})
	}
});
});

	$('#ajax').on('click', '.emoji', function () {
			var react = $(this);
			var item = react.parents('.infinite-item').attr("item-id");
			var pk = react.data('id');
			payload = {
					'item': item,
					'csrf_token': csrftoken
				}
			$.ajax({
					url: "/main/react/" + item + "/" + pk + "/",
					type: 'POST',
					cache: false,
					data: payload,
					success: function(data) {
							react.find("[data-count='react']").text(data.react_count);
							react.parents('.infinite-item').find(".reactions_stream").prepend(data);
							$(react).siblings('.reaction_window').html('').load("/main/react_window/" + item + "/");
							$.toast({
									heading: 'Информация',
									text: 'Ваша реакция засчитана',
									showHideTransition: 'fade',
									icon: 'info'
							})
					},
					error: function(data) {
						$.toast({
								heading: 'Ошибка',
								text: 'Вы уже отреагировали этим смайлом',
								showHideTransition: 'fade',
								icon: 'error'
						})
					}
			});
			return false;
	});


  $('.item_fullscreen_hide').on('click', function () {
  	 $('.item_fullscreen').hide();
  	 $('#item_loader').empty();
  });

  $('#ajax').on('click', '.itemComment', function () {
  button1 = $(this);
  form1 = button1.parent().parent().parent();
        $.ajax({
            url: '/main/post-comment/',
            data: form1.serialize(),
            type: 'POST',
            cache: false,
            success: function(data) {
                $(".form-control-rounded").val("");
                $(".stream_comments").append(data);
            },
            error: function(data) {
              $.toast({
                  heading: 'Ошибка',
                  text: 'Для публикации комментария нужно написать что-нибудь и/или вставить изображение(ия)',
                  showHideTransition: 'fade',
                  icon: 'error'
              })
            },
        });
        return false;
    });

  $('#ajax').on('click', '.replyComment', function () {
  button = $(this);
  form = button.parent().parent().parent().parent();
        $.ajax({
            url: '/main/reply-comment/',
            data: form.serialize(),
            type: 'POST',
            cache: false,
            success: function(data) {
                $(".form-control-rounded").val("");
                $(".stream_reply_comments").append(data);
            },
            error: function(data) {
              $.toast({
                  heading: 'Ошибка',
                  text: 'Для публикации ответа нужно написать что-нибудь и/или вставить изображение(ия)',
                  showHideTransition: 'fade',
                  icon: 'error'
              })
            },
        });
        return false;
    });

  $('#ajax').on('click', '.replyParentComment', function () {
  button = $(this);
  form = button.parent().parent().parent().parent();
        $.ajax({
            url: '/main/reply-comment/',
            data: form.serialize(),
            type: 'POST',
            cache: false,
            success: function(data) {
                $(".form-control-rounded").val("");
                $(".stream_reply_comments").append(data);
            },
            error: function(data) {
              $.toast({
                  heading: 'Ошибка',
                  text: 'Для публикации ответа нужно написать что-нибудь и/или вставить изображение(ия)',
                  showHideTransition: 'fade',
                  icon: 'error'
              })
            },
        });
        return false;
    });

	$( "#ajax" ).on('click', '.reply_comment', function () {
    var reply_comment_form = $(this);
    var objectUser = reply_comment_form.prev().text().trim();
    var form = reply_comment_form.next().find(".text-comment");
    form.val(objectUser + ', ');
		reply_comment_form.next().show();
    form.focus();
	})


	var infinite = new Waypoint.Infinite({
	    element: $('.infinite-container')[0],
	    onBeforePageLoad: function() {
	        $('.load').show();
	    },
	    onAfterPageLoad: function($items) {
	        $('.load').hide();
	    }
	});

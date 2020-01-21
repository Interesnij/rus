
$('.photos-container').on('click', '.photo_detail', function() {
    photo = $(this); photo_id = photo.data("id"); user_uuid = photo.data("uuid");
    $('#photo_loader').html('').load("/gallery/load/photo/" + photo_id + "/" + user_uuid + "/")
    $('.photo_fullscreen').show();
});

$('.album-container').on('click', '.album_photo_detail', function() {
    photo = $(this); pk = photo.data("pk"); uuid = photo.data("uuid"); uuid2 = photo.data("uuid2");
    $('#photo_loader').html('').load("/gallery/load/u_photo/" + pk + "/" + uuid + "/" + uuid2 + "/")
    $('.photo_fullscreen').show();
});

$("#photos_add").click(function() { $('#photos_add_window').show(); })
$("#albums_add").click(function() { var user = $(this); var user_id = user.data("uuid"); $('#photo_add_loader').html('').load("/gallery/user/add_album/" + user_id + "/"); $('.add_fullscreen').show(); })
$('.add_fullscreen_hide').on('click', function() { $('.add_fullscreen').hide(); $('#photo_loader').empty(); });
$('.photo_fullscreen_hide').on('click', function() { $('.photo_fullscreen').hide(); $('#photo_loader').empty(); });

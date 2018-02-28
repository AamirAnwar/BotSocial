
$("#add_photo_button").click(function() {
	$("#story_image_input").click();
});

$("#add_video_button").click(function() {
	$("#story_video_input").click();
});

$("#story_image_input").change(function(){
	// $("#uploadForm").submit();
	readURL(this);
});

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('#selected_image_container').append('<img class="story_uploaded_image" src=' + e.target.result + ' alt="" />');
		}
		reader.readAsDataURL(input.files[0]);
	}
}

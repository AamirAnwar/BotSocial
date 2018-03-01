$("#profile_image_container").click(function() {
  $("#file_input").click();
});

$("#file_input").change(function() {
  $("#uploadForm").submit();
});

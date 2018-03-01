
function openCommentsDialog(story_id) {

}

$(".comments_button").click(function() {
  // modal-content
  const prefix = "comments_button_";
  openCommentsDialog($(this).attr('id').substring(prefix.length));
});

$(".like_button").click(function(){
  // console.log("Like button clicked with id " + $(this).attr('id'));
  like($(this).attr('id'));
});
$(".dislike_button").click(function(){
  dislike($(this).attr('id'));
});


function like(story_id) {
  // console.log("getting theere!");
  $.post("/story/"+story_id.substring(5)+"/like", function(data) {
    if (data.success == true) {
      // Succeed in liking the picture
      $("#like_"+data.story._id).animateCss('bounceIn');
      $("#like_"+data.story._id).find('.like_count').text(data.count);
    }
  });
}

function dislike(story_id) {
  // console.log("getting theere!");
  $.post("/story/"+story_id.substring(8)+"/dislike", function(data) {
    if (data.success == true) {
      // Succeed in liking the picture
      $("#dislike_"+data.story._id).animateCss('bounceIn');
      $("#dislike_"+data.story._id).find('.dislike_count').text(data.count);
    }
  });
}

$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });
    return this;
  },
});

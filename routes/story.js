var express = require('express');
var router = express.Router();
var Story = require('mongoose').model('Story');
var middleware = require("../middleware");

// Create a story
router.post("/",middleware.isLoggedIn,function(req,res){
	// console.log("I shall now proceed to create post! with" + req.body.text);
	if (req.body.text.length <= 0) {
		req.flash('flash_msg_fail', 'Stories have to be non-empty!');
		return res.redirect('back');
	}

	Story.create({text:req.body.text}, function(err, story){
		if (err) {
			console.log(err);
			req.flash('flash_msg_fail', 'Something went wrong!');
			res.redirect('back');
		}
		else {
			console.log("Current user is" + req.user);
			story.author = req.user._id;
			// story.author.username = req.user.username;
			story.save();
			console.log(story);
		}
		req.flash('flash_msg', 'Successfully posted story!');
		res.redirect("/");
	});
});

router.post("/:id/like", middleware.isLoggedIn,function(req,res) {
	Story.findById(req.params.id, function(err,story){
		if (err) {
			console.log(err);
			return res.send('Error');
		}
		var isLiked = false;
		var index = -1
		const numLikes = story.likes.length;
		console.log(story.likes);
		for (var i = 0; i < story.likes.length; i++) {
			console.log("Left - " + typeof(story.likes[i]._id));

			console.log("Right - " + typeof(req.user._id));
			if (story.likes[i]._id.equals(req.user._id)) {
				console.log('already liked!');
				index = i;
				isLiked = true;
			}
		}

		if (isLiked) {
			story.likes.splice(index,1)
			story.save(function(err) {
				if (err) {
					console.log(err);
				}
				res.json({success:true,story:story, count:(numLikes - 1)});
			});
		}
		else {
			console.log('Havent liked yet');
			story.likes.push(res.locals.currentUser._id);
			story.save(function(err) {
				if (err) {
					console.log(err);
				}
				res.json({success:true,story:story, count:(numLikes + 1)});
			});
		}



	});

});

module.exports = router;

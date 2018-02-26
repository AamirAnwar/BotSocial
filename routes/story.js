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
			story.author.id = req.user._id;
			story.author.username = req.user.username;
			story.save();
			console.log(story);
		}
		req.flash('flash_msg', 'Successfully posted story!');
		res.redirect("/");
	});
});

router.post("/:id/like", function(req,res) {
	Story.findById(req.params.id, function(err,story){
		if (err) {
			console.log(err);
			return res.send('Error');
		}
		//Is this correct? wtf
		story.likes_count = story.likes_count + 1;
		story.save(function(err) {
			if (err) {
				console.log(err);
			}
			res.json({success:true,story:story});
		});


	});

});

module.exports = router;

var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
var Story = require('mongoose').model('Story');
var middleware = require("../middleware");

// router.use(fileUpload());

// Create a story
router.post("/",middleware.isLoggedIn,function(req,res){
	console.log(req.body);
	if (req.body.text.length <= 0) {
		req.flash('flash_msg_fail', 'Stories have to be non-empty!');
		return res.redirect('back');
	}
	if (!req.files) {
		return res.status(400).send('No files were uploaded');
	}

	Story.create({text:req.body.text}, function(err, story){
		if (err) {
			console.log(err);
			req.flash('flash_msg_fail', 'Something went wrong!');
			res.redirect('back');
		}
		else {
			// console.log("Current user is" + req.user);

			// Save image
			const file = req.files.image;
			if (file) {
				file.mv('./public/images/' + story._id + '.jpg', function(err){
					if (err) {
						//TODO But the story has already been saved!. Problem here if this fails
						return res.status(500).send(err);
					}


				story.author = req.user._id;
				story.save(function (err) {
					req.flash('flash_msg', 'Successfully posted story!');
					return res.redirect("/");
				});


			});
			// console.log(story);
		}
		else {
			return res.status(500).send("Failed!");
		}
	}
	});
});

router.post("/:id/dislike",middleware.isLoggedIn, function(req,res){
	Story.findById(req.params.id, function(err,story){
		if (err) {
			console.log(err);
			return res.send(err);
		}
		var index = -1
		var isDisliked = story.dislikes.some(function(user_id,currentIndex){
			if (req.user._id.equals(req.user._id)) {
				index = currentIndex;
				return true;
			}
		});

		if (isDisliked && index != -1) {
			story.dislikes.splice(index,1);

		}
		else {
			story.dislikes.push(req.user._id);
		}
		story.save(function(err) {
			if (err) {
				console.log(err);
			}
			return res.json({success:true,story:story, count:story.dislikes.length});
		})
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

		for (var i = 0; i < story.likes.length; i++) {
			if (story.likes[i]._id.equals(req.user._id)) {
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

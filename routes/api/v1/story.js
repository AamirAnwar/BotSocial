const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Story = mongoose.model('Story');
const Comment = mongoose.model('Comment');
const middleware = require('../../../middleware');


// Get all stories
// TODO load more

router.get('/', passport.authenticate('jwt', { session: false }),function(req,res) {
  // console.log(req);
  GetStories(function(stories){
		res.send(stories);
	});
});

// Get a particular story
router.get('/:id', function(req,res) {

});

// Create a story
router.post('/', passport.authenticate('jwt', { session: false }),function(req,res) {
	if (req.body.text.length <= 0) {
		res.status(400).send('Fields required!');
	}
	// if (!req.files) {
	// 	return res.status(400).send('No files were uploaded');
	// }

	Story.create({text:req.body.text}, function(err, story){
		if (err) {
			res.status(500).send('Something went wrong');
		}
		else {
			story.author = req.user._id;
			// Save image or video
			story.save(function(err) {
				if (err) {
					return res.status(500).send("Failed!");
				}		
				return res.json({
					status:"success",
					story:story
				});
		});
		}
	});
});



// Delete a story
router.delete('/:id', function(req,res) {

});

// Update a Story
router.put('/:id', function(req,res) {

});


// Dislike a story
router.post("/:id/dislike",passport.authenticate('jwt', { session: false }), function(req,res) {
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
			return res.json({success:true,story:story});
		})
	});
});

// Like a story
router.post("/:id/like", passport.authenticate('jwt', { session: false }),function(req,res) {
	console.log(req.headers);
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
			story.likes.push(req.user._id);
			story.save(function(err) {
				if (err) {
					console.log(err);
				}
				res.json({success:true,story:story});
			});
		}
	});
});

// Comment on a story
router.post('/:id/comment', passport.authenticate('jwt', { session: false }),function(req,res){
	const text = req.body.text;
	if (text.length < 1) {
		return res.status(500).send("No text!");
	}

	Story.findById(req.params.id,function(err,story) {
		if (err || !story) {
			return res.status(404).send("Couldnt find a story");
		}
		Comment.create({text:text,author:{id:req.user._id,username:req.user.username}},function(err, comment){
			if (err) {
				return res.status(404).send("Couldnt find a story");
			}
			story.comments.push(comment);
			story.save(function(err){
				if (err) {
						return res.status(404).send("error");
				}
				return res.json({success:true,story:story, comment:comment});
			})

		});

	});
});



// Helpers
var GetStories = function(callback){
	Story.find({},null,{sort:'-date'}).populate('author').exec(function (err, stories) {
		if (err) {
			callback([]);
		}
		else {
			callback(stories);
		}
	});
}

module.exports = router;

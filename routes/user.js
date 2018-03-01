var moment = require('moment');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Story = mongoose.model('Story');
var middleware = require('../middleware');

// Show profile page
router.get('/:id',middleware.isLoggedIn, function(req,res) {
	user_id = req.params.id;
	if (!user_id) {
		user_id = req.user._id;
	}

	User.findOne({_id:user_id}, function(err, user){
		if (err || !user) {
			console.log("No user!");
			res.redirect('/');
		}
		else {
			GetUserStories(user._id, function(stories) {
				user.joinedDate = moment(user.date).format('MMMM DD, YYYY')
				res.render('profile', {user:user, stories:stories});
			});
		}
	});
});


router.post('/image',function(req,res) {
	if (!req.files) {
		return res.status(400).send('No files were uploaded');
	}
	const file = req.files.image;
	file.mv('../public/images/' + req.user._id + '.jpg', function(err){
		if (err) {
			return res.status(500).send(err);
		}
		res.redirect('back');
	});
});

// DB Helpers
var GetUserStories = function(id, callback) {
	Story.find({'author':id}, null, {sort:'-date'}).populate('author').exec(function(err, stories){
		if (err) {
			console.log(err);
			callback([]);
		}
		else {
			callback(stories);
		}
	});
}


module.exports = router;

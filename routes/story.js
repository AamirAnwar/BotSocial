var express = require('express');
var router = express.Router();
var Story = require('mongoose').model('Story');
var middleware = require("../middleware");

// Create a story
router.post("/",middleware.isLoggedIn,function(req,res){
	console.log("I shall now proceed to create post! with" + req.body.text);
	Story.create({text:req.body.text}, function(err, story){
		if (err) {
			console.log(err);
		}
		else {
			console.log(story);
		}
		res.redirect("/");
	});
});

module.exports = router;
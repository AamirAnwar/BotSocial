var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');
var cfg = require("../../../config.js");

// Auth Routes
router.post("/register", function(req,res) {
	// console.log("Creating a new user now with" + "\nemail:" + req.body.email + "\npassword:" + req.body.password);
	const username = req.body.username;
	const password = req.body.password;
	if (!(username && password)) {
		return res.json({"status":"failed",error:"Missing info"});
	}

	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.json({"status":"failed","error":err});
		}
		console.log("Successfully created user!")
		// TODO figure out how to manage this token at the backend
		var token = jwt.sign({ user_id: user._id }, cfg.jwtSecret);
		return res.json({
			"status":"success",
			"user": {
				"username":user.username
			},
			"access_token":token
		});
	});
});

router.post("/login" , passport.authenticate("local"),function(req,res) {
	// console.log(req);
	var token = jwt.sign({ user_id: req.user._id }, cfg.jwtSecret);
	return res.json({
		"status":"success",
		"user": {
			"username":req.user.username
		},
		"access_token":token
	});
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash('flash_msg', 'You have been successfully logged out!');
	res.redirect('/login');
});
module.exports = router;

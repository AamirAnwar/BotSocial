var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');

router.post("/register", function(req,res) {
	// console.log("Creating a new user now with" + "\nemail:" + req.body.email + "\npassword:" + req.body.password);
	const username = req.body.username;
	const password = req.body.password;
	if (!(username && password)) {
		return res.json({
			status:"error",
			message: "Username and password required"
		});
	}

	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render('register');
		}
		console.log("Successfully created user!")
		var token = jwt.sign({ user_id: user._id }, 'shhhhh');
		res.json(
			{
				status: "Success",
				user: {
					username: user.username
				},
				access_token:token
			}
		);

	});
});

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('mongoose').model('User');


// Auth Routes
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req,res) {
	// console.log("Creating a new user now with" + "\nemail:" + req.body.email + "\npassword:" + req.body.password);
	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render('register');
		}
		console.log("Successfully created user!")
		passport.authenticate("local",{failureRedirect:'/register'})(req,res,function(){
			// If you get till here everything went well and the user is now registered!
			res.redirect("/");
		});

	});
});


router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",{successRedirect:"/",failureRedirect:"/login"}) ,function(req,res){});

router.get("/logout",function(req,res){
	req.logout();
	res.redirect('/login');
});
module.exports = router;

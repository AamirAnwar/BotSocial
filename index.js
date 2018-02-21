var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

// Data Models
var User = require('./models/user')
var Story = require('./models/story');

// App Setup
var app = express();
var PORT = 3000;

// Express middleware and setup 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
	secret:'requiescat in pace',
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup passport
// Used for encoding and decoding user session data associated with each http packet
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Setup mongoose
const mongoConnectURL = 'mongodb://localhost/botsocial_v1';
mongoose.connect(mongoConnectURL);


// DB Helpers
var GetStories = function(callback){
	Story.find({},function(err, stories) {
		if (err) {
			callback([]);
		}
		else {
			callback(stories);
		}
	});
}

// General Routes
app.post("/story",function(req,res){
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


//Auth routes

// New User
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req,res) {
	console.log("Creating a new user now with" + "\nemail:" + req.body.email + "\npassword:" + req.body.password);
	var username = req.body.username;
	var pass = req.body.password;
	User.register(new User({username:username}), pass, function(err, user){
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

// Login user

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",{successRedirect:"/",failureRedirect:"/login"}) ,function(req,res){});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect('/login');
});

// Fallback Route
app.get("/*", function(req, res){
	if (req.isAuthenticated() == false) {
		res.redirect("/login");
		return
	}

	GetStories(function(stories) {
		res.render("home", {stories:stories});
	});
	
});


app.listen(PORT, function() {
	console.log("Server started on " + PORT);
});
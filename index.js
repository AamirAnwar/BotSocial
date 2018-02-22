var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');


// Data Models
var User = require('./models/user')
var Story = require('./models/story');

// Routers
var AuthRouter = require('./routes/auth');
var StoryRouter = require('./routes/story');

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

// Routes
app.use(AuthRouter);
app.use('/story',StoryRouter);

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

// Start Server
app.listen(PORT, function() {
	console.log("Server started on " + PORT);
});
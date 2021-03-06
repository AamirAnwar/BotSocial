var express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var middleware = require('./middleware');
var expressSession = require('express-session');
var flash = require('connect-flash-light');
var cookieParser = require('cookie-parser');
var expressLogging = require('express-logging');
var logger = require('logops');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var cfg = require("./config.js");

// Data Models
var User = require('./models/user')
var Story = require('./models/story');

// Routers
var AuthRouter = require('./routes/auth');
var UserRouter = require('./routes/user');
var StoryRouter = require('./routes/story');

// API v1
var ApiStoryRouter = require('./routes/api/v1/story');
var ApiUserRouter = require('./routes/api/v1/user');

// App Setup
var app = express();
var PORT = 5000;

// Express middleware and setup

// Templating engine -> EJS
app.set('view engine','ejs');

// Set public directory for static content [Static HTML,stylesheets and js files]
app.use(express.static('public'));

//  Allows us to do 'req.body and req.query'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Used for displaying flash messages
app.use(cookieParser());

// Used for uploading profile picture
app.use(fileUpload());

// Needed for passport password salting and flash messages
app.use(expressSession({
	secret:'requiescat in pace',
	resave:false,
	saveUninitialized:false
}));

// Tell express to use the flash module. This is setup step for displaying flash messages
app.use(flash());

// Passport initialization steps
app.use(passport.initialize());
app.use(passport.session());

// Setup custom middleware for setting global variables on all response objects
app.use(function(req, res, next) {
	// These are global variables
	res.locals.currentUser = req.user;
	res.locals.flash_msg = req.flash('flash_msg');
	res.locals.flash_msg_fail = req.flash('flash_msg_fail');
	next();
});

// Logging
app.use(expressLogging(logger));

// Setup passport
// Used for encoding and decoding user session data associated with each http packet
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Setup mongoose
const mongoConnectURL = 'mongodb://localhost/botsocial_v1';
mongoose.connect(mongoConnectURL);

// CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// JSW JwtStrategy
var opts = {}
opts.jwtFromRequest = function(req) {
  // console.log("Sending " + req.headers.auth_token);
  return req.headers.auth_token;
}

opts.secretOrKey = cfg.jwtSecret;

// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		// console.log("ID being used" + JSON.stringify(jwt_payload, null, 2));
    User.findById(jwt_payload.user_id, function(err, user) {
        if (err) {
          console.log(err);
            return done(err, false);
        }
        if (user) {
					console.log("Current user" + user);
            return done(null, user);
        } else {
          // console.log("No user");
            return done(null, false);
            // or you could create a new account
        }
    });
}));


// Local Routes
app.use(AuthRouter);
app.use('/user',UserRouter);
app.use('/story',StoryRouter);

// API v1 Routers
app.use('/api/v1/story',ApiStoryRouter);
app.use('/api/v1/user',ApiUserRouter);

// Home page
app.get("/", function(req, res){
	if (req.isAuthenticated() == false) {
		res.redirect("/login");
		return
	}
	GetStories(function(stories) {
		res.render("home", {stories:stories});
	});
});

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


// Fallback Route
app.get("/*", function(req, res) {
	res.send("Nothing here");
});


// Start Server
app.listen(PORT, function() {
	console.log("Server started on " + PORT);
});

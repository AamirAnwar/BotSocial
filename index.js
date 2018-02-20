var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var PORT = 3000;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Setup mongoose
const mongoConnectURL = 'mongodb://localhost/botsocial_v1';
mongoose.connect(mongoConnectURL);

// Schemas
var Schema = mongoose.Schema;

var storySchema = new Schema({
	text:String,
	date:{type:Date,default:Date.now}
});


//Models
var Story = mongoose.model("Story", storySchema);

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

// Routes
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

app.get("/*", function(req, res){
	GetStories(function(stories) {
		res.render("home", {stories:stories});
	});
	
});


app.listen(PORT, function() {
	console.log("Server started on " + PORT);
});
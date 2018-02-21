var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username:String,
	password:String
});

// Adds methods on the user schema which come bundled with passport local mongoose
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);
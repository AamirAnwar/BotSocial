var mongoose = require('mongoose');
var StorySchema = new mongoose.Schema({
	text:String,
	date:{type:Date,default:Date.now}
});
module.exports =  mongoose.model("Story", StorySchema);
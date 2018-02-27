var mongoose = require('mongoose');
var moment = require('moment');
var userType = {id: {
	type:mongoose.Schema.Types.ObjectId,
	ref:'User'
}};
var StorySchema = new mongoose.Schema({
	text:String,
	date_posted:{type:String,default:moment().format('MMMM Do YYYY, h:mm:ss a')},
	date:{type:Date,default:Date.now},
	likes:[userType],
	dislikes_count:{type:Number, default:0},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	username:String
});
module.exports =  mongoose.model("Story", StorySchema);

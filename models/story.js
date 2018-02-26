var mongoose = require('mongoose');
var moment = require('moment');
var StorySchema = new mongoose.Schema({
	text:String,
	date_posted:{type:String,default:moment().format('MMMM Do YYYY, h:mm:ss a')},
	date:{type:Date,default:Date.now},
	likes_count:{type:Number, default:0},
	dislikes_count:{type:Number, default:0},
	author:{
		id: {
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		username:String
	}
});
module.exports =  mongoose.model("Story", StorySchema);

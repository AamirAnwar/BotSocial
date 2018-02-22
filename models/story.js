var mongoose = require('mongoose');
var StorySchema = new mongoose.Schema({
	text:String,
	date:{type:Date,default:Date.now},
	author:{
		id: {
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		username:String
	}
});
module.exports =  mongoose.model("Story", StorySchema);
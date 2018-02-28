var mongoose = require('mongoose');
var MinUserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username:String,
	date:{type:Date, default:Date.now()}
});
var CommentSchema = new mongoose.Schema({
  text:String,
  date:{type:Date, default:Date.now()},
  author:MinUserSchema
});
module.exports = CommentSchema;

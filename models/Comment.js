var db = require('../lib/db');
var mongoose = require('mongoose')
  , Schema = mongoose.Schema


//Create Schema

var commentSchema = db.Schema({
  author: String,
  words: {type: String, required: true},
});


//Assign User Object
var myComment = db.mongoose.model('Comment', commentSchema);

Schema.Types.ObjectId

//exports
module.exports = myComment;

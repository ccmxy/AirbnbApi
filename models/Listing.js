var db = require('../lib/db');

//Create Schema
var locationSchema = db.Schema({
  city: String,
  state: String,
  _id:false
});
var commentSchema = db.Schema({
  author: String,
  words: {type: String, required: true},
});
var listingSchema = db.Schema({
  location: locationSchema,
  comments: [commentSchema],
  name: {type: String, unique: true, required: true},
  noGuests: {type: Number, unique: false},
  price: {type: Number}
});

//Assign User Object
var myListing = db.mongoose.model('Listing', listingSchema);

//exports
module.exports = myListing;

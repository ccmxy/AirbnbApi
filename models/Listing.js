var db = require('../lib/db');

//Create Schema
var locationSchema = db.Schema({
  city: String,
  state: String,
  _id:false 
});
var listingSchema = db.Schema({
  location: locationSchema,
  name: {type: String, unique: true, required: true},
  noGuests: {type: Number, unique: false},
  price: {type: Number}
});


//Assign User Object
var myListing = db.mongoose.model('Listing', listingSchema);

//exports
module.exports = myListing;

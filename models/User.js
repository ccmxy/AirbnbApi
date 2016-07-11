var db = require('../lib/db');

//Create Schema
var UserSchema = db.Schema({
  email: {type: String, unique: true},
  username: {type: String, unique:true},
  password: String
});

//Assign User Object
var myUser = db.mongoose.model('User', UserSchema);

//exports
module.exports = myUser;

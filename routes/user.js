//Route file
User = require('../models/User.js');

/* GET users listing. */
exports.index = function(req, res){

  User.find({}, function(err, docs){
    res.render('index', {
      "users" : docs
    });
  });
};

exports.getAll = function(req, res){
  User.find({}, function(err, docs){
    res.json(docs);
  });
  res.json
};

// Display user form
exports.regform = function(req,res){
  res.render('regform');
};


//View
exports.view = function(req,res){
  id = req.params.id;

  User.find({_id:id}, function(err, docs){
    res.render('view', {
      "users" : docs
    });
  });

 };

//Edit
 exports.edit = function(req,res){
   id = req.params.id;

   User.find({_id:id}, function(err, docs){
     res.render('edit', {
       "users" : docs
     });
   });

  };

//Post user data

//defined by
//app.post('/register',user.register);
exports.register = function(req,res){
  addEventListener("message", receiveMessage, false);

  var user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err){
    if(err){
      callback(err);
    }
    else{
      res.redirect('/');
    }
  });
}

function receiveMessage(event)
{
    console.log(event.data);
}


  //Delete
  exports.delete = function(req,res){
    id = req.params.id;
    User.find({_id:id}).remove(function(){
      res.redirect('/');
    });

  };

  //Update
exports.update = function(req,res){
  var conditions = {_id:req.body.id}
  , update = {
       username: req.body.name,
       email: req.body.email
     }
  , options = { multi: false };

User.update(conditions, update, options, callback);

  function callback (err, numAffected) {
    if(err) { throw err; }
    res.redirect('/');
  };

 }

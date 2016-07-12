//Route file
Listing = require('../models/Listing.js');
APIKey = require('../models/APIKey.js');
Comment = require('../models/Comment.js');

/* GET all listings */
exports.getAll = function(req, res){
  Listing.find({}, function(err, docs){
    res.json(docs);
  });
  res.json
};

exports.index = function(req, res){
  Listing.find({}, function(err, docs){
    res.render('indexlisting', {
      "listings" : docs
    });
  });
};

  exports.getkey = function(req, res){
    var apikey = new APIKey();
    apikey.key = createKey();
    apikey.save(function(err){
      if(err){
        callback(err);
      }
      else{
        console.log("KEY: " + apikey.key);
        res.render('apiview', {
          yourKey: apikey.key

        });
      }
    });
}

exports.api = function(req,res){
  res.render('apiview');
};

exports.regformlisting = function(req,res){
  res.render('regformlisting');
};

//View
exports.view = function(req,res){
  id = req.params.id;

  Listing.find({_id:id}, function(err, docs){
    res.render('viewlisting', {
      "listings" : docs
    });
  });
 };

//Edit
 exports.edit = function(req,res){
   id = req.params.id;

   Listing.find({_id:id}, function(err, docs){
     res.render('editlisting', {
       "listings" : docs
     });
   });
  };

//Delete
  exports.delete = function(req,res){
    id = res.params.id;
    Listing.find({_id:id}).remove(function(){
      res.redirect('/');
    });

  };

  exports.deleteListing = function(req, res){
    var apikey = req.body.appid;
    APIKey.find({key:apikey}, function(err, docs){
      if (err) {
        res.json(err);
      }
      if(!docs.length){
        res.json("INVALID API KEY")
      }
      if(docs.length){
         if(req.body.id){
          console.log("The Docs: "+ docs);
          id = req.body.id;
          Listing.find({_id:id}).remove(function(err, docs){
            if(err){
              res.json(err)
            }
            if(!docs.length){
              res.json("Failure: Listing with id " + id + " not found in database.");
            }

            if(docs.length){
              res.json("Success: Listing with id " + id + " removed from database.");
            }
            //res.redirect('/');
          });
        }
        else if(req.body.name){
          name = req.body.name;
          Listing.find({name:name}).remove(function(err, docs){
            if(err){
              res.json(err);
            }
            if(!docs.length){
              res.json("Failure: Listing with the name " + name + " was not found in database.")
            }
            if(docs.length){
             res.json("Success: Listing " + name + " removed from database.");
           }
          }
        );
        }

      }

    })

  }

//Update by name API route
  exports.updateByName = function(req,res){
    var conditions = {name:req.body.name}
    , update = {
         location: {state: req.body.state, city: req.body.city},
         noGuests: req.body.noGuests,
         price: req.body.price
       }
    , options = { multi: false };

    Listing.update(conditions, update, options, callback);

    function callback (err, numAffected) {
      if(err) { throw err; }
      res.json('Updated listing ' + req.body.name);
    };
   }

  //Update used in app
exports.update = function(req,res){
  var conditions = {_id:req.body.id}
  , update = {
       location: {state: req.body.state, city: req.body.city},
       name: req.body.name,
       noGuests: req.body.noGuests,
       price: req.body.price
     }
  , options = { multi: false };

  Listing.update(conditions, update, options, callback);

  function callback (err, numAffected) {
    if(err) { throw err; }
    res.redirect('/');
  };
 }

 //Uses the Update route with body instead of params
 exports.changelisting = function(req,res){
   var apikey = req.body.appid;
    APIKey.find({key:apikey}, function(err, docs){
      if (err) {
        res.json(err);
     }
     if(!docs.length){
       res.json("Invalid API Key");
     }
     if(docs.length){
       var conditions = {_id:req.body.id}
       , update = {
            location: {state: req.body.state, city: req.body.city},
            name: req.body.name,
            noGuests: req.body.noGuests,
            price: req.body.price
          }
       , options = { multi: false };

       Listing.update(conditions, update, options, callback);

       function callback (err, numAffected) {
         if(err) { throw err; }
         res.redirect('/');
       };
    }
  });
 }


 exports.addcomment = function(req, res){

console.log(req.body.id);
//var comment = new Comment({words: req.body.words, author: "me"});
var comment = {
  words: req.body.words,
  author: "Me"
}

// Create the category here. `category` is the saved category.
Comment.create(comment, function (err, category) {
  if (err) console.log(err);

   Listing.findOne({_id:req.body.id}, function(err, docs){
     if (err){
       res.json(err);
     }
     docs.comments.push(comment);
     //console.log(words);
     docs.save(function (err) {
       if (err) return handleError(err)
       console.log('Success!');
     });
    //  Listing.update({ _id: req.body.id},{ $push: { comments: { words: req.body.words } } });
     res.redirect("/view/" + req.body.id);
   });
 });

 }

exports.addlisting = function(req,res){
  var apikey = req.body.appid;
   APIKey.find({key:apikey}, function(err, docs){
     if (err) {
       res.json(err);
    }
    if(!docs.length){
      res.json("Invalid API Key");
    }
    if(docs.length){
      var listing = new Listing({ location: { city: req.body.city , state: req.body.state}, comments: [{}] });
      listing.name = req.body.name;
      listing.noGuests = req.body.noGuests;
      listing.price = req.body.price;
      listing.location.city = req.body.city;
      listing.location.state = req.body.state;
      listing.save(function(err){
        if(err){
          callback(err);
        }
        else{
          res.redirect('/');
        }
      })
   }
 });
}

exports.register= function(req,res){
  var listing = new Listing({ location: { city: req.body.city , state: req.body.state} });
  listing.name = req.body.name;
  listing.noGuests = req.body.noGuests;
  listing.price = req.body.price;
  listing.location.city = req.body.city;
  listing.location.state = req.body.state;
  listing.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.redirect('/');
    }
  });
}

//Not used
exports.statelisting = function(req,res){
 state = req.params.state;
  Listing.find({'location.state':state}, function(err, docs){
    res.json(docs);
  });
  res.json
 };


 exports.location = function(req,res){
  //state = req.params.state;
  state = req.query.state;
  console.log(state);
  city = req.query.city;
  console.log(state);
  if (city && state){
    Listing.find({'location.state':state, 'location.city':city}, function(err, docs){
      res.json(docs);
    });
    res.json
   }
  else if (state){
   Listing.find({'location.state':state}, function(err, docs){
     res.json(docs);
   });
   res.json
  }

  else if (city){
   Listing.find({'location.city':city}, function(err, docs){
     res.json(docs);
   });
   res.json
  }
  else {
    res.json("None found for that request.");
  }
 };

//Make API Key
 function createKey()
{
   var text = "";
   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for( var i=0; i < 10; i++ )
       text += possible.charAt(Math.floor(Math.random() * possible.length));

   return text;
}

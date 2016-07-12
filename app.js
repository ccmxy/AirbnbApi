var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var listing = require('./routes/listing');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Get routes for web interace
app.get('/', listing.index);
app.get('/api', listing.api);
app.get('/regform', listing.regformlisting);
app.get('/getkey', listing.getkey);
app.get('/view/:id', listing.view);
app.get('/edit/:id',listing.edit);

//Get API Routes
app.get('/getlistings', listing.getAll);
app.get('/statelistings/:state', listing.statelisting);
app.get('/getlistingsbylocation/', listing.location);

//Delete routes
app.delete('/delete/:id', listing.delete);
app.delete('/delete', listing.deleteListing);

//Post routes
app.post('/register',listing.register);
app.post('/addlisting',listing.addlisting);

//Put routes
app.put('/edit/update',listing.update);
app.put('/updatelistingbyname', listing.updateByName);
app.put('/update', listing.changelisting);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//Error handlers:

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

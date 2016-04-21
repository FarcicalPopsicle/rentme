/* Server */
var express = require("express");
var session = require('express-session');
var path = require("path");
var app = express();
var port = process.env.PORT || 7777;
var routes = require('./controllers/routes.js');
var db = require('./db/index.js');
var User = require('./models/userModel.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Must create this!
var apiKeys = require('./utility/apikeys.js');

passport.use(
  new GoogleStrategy({
    clientID: apiKeys.google.key,
    clientSecret: apiKeys.google.secret,
    callbackURL: 'http://localhost:' + port + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile, function (err, user) {
      return done(err, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if (user) {
    User.findUserById(user.id, function(err, results) {
      if (err) { 
        return done(err);
      }
      done(err, results);
    });
  }
});

/* Static */
app.use(express.static(path.join(__dirname, "../client")));

/* middlewares */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
 
routes(app, passport);

app.listen(port, function() {
 console.log("listening on port " + port);
});

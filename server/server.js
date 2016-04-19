/* Server */
var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 7777;
var routes = require('./controllers/routes.js');
var db = require('./db/index.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Must create this!
var apiKeys = require('./utility/apikeys.js');

passport.use(
  new GoogleStrategy({
    clientID: apiKeys.google.key,
    clientSecret: apiKeys.google.secret,
    callbackURL: "http://localhost/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  })
);

/* Static */
app.use(express.static(path.join(__dirname, "../client")));

/* middlewares */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
 
routes(app);

app.listen(port, function() {
 console.log("listening on port " + port);
});

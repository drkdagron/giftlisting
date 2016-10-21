var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {
        console.log('called in here?');
        User.findOne({
            username: username
        }, function(err, user) {

            console.log("before err");
            if (err) {
                return done(err);
            }
            console.log("after err");
            console.log("before !user");
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            console.log("after !user");
            console.log("before !user.authenticate");
            if (!user.authenticate(password)) {
                console.log("inside authenticate");
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            console.log("after !user.authenticate");

            return done(null, user);
        });
        console.log("User Findone");
    }));
};
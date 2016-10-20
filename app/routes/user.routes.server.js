var user = require('../controllers/user.controller.server'),
    passport = require('passport');

module.exports = function(app) {
    //sign up
    app.get('/signup', user.renderSignup);
    app.post('/signup', user.signup);

    //signing in
    app.get('/signin', user.renderSignin);
    app.route('/signin').post(passport.authenticate('local', {
                          successRedirect: '/app',
                          failureRedirect: '/',
                          failureFlash: true
                      }));
    
    app.get('/app', function(req, res) { res.render('app', { userFullName:JSON.stringify(req.user) }); });

    //signing out
    app.get('/signout', user.signout);
};
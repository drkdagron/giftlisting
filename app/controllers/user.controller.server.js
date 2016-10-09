var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		return res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {

		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		return res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
        console.log(user);
		var message = null;

		user.provider = 'local';

        User.findOne({username: user.username}, function(err, found) {
            console.log("USER FOUND: " + found);
            if (found === null)
            {
                console.log("saving user");
                user.save(function(err) {
                    if (err) {
                        var message = getErrorMessage(err);

                        req.flash('error', message);
                        return res.redirect('/signup');
                    }
                    
                    req.login(user, function(err) {
                        if (err) return next(err);
                        return res.redirect('/');
                    });
		        });
            }
            else
            {
                console.log("user already exists");
                req.flash('error', "USER ALREADY EXISTS");
                return res.redirect('/signup');
            }
        });
		
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res) {
	req.logout();

	res.redirect('/');
};

exports.requiresLogin = function(req,res, next){
    if(!req.isAuthenticated()){
        return res.status(400).send({
            message: 'User is not logged in'
        });
    }
    
    next();
};
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    created : {
        type: Date,
        default : Date.now
    },
    username : {
        type: String,
        trim: true,
        required: "No username entered"
    },
    name : {
        type: String,
        trim: true,
        default: '',
        required: "No name entered"
    },
    password : {
        type: String,
        required: "No password entered"
    },
    salt: {type: String},
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
});


UserSchema.pre('save', function(next) {
    if (this.password)
    {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password)
{
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    console.log("checking username");
    var _this = this;
    var possibleUsername = username + (suffix || '');
    
    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } 
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } 
        else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});


mongoose.model('User', UserSchema);
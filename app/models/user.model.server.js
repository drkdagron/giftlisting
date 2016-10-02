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
    salt: {type: String}
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
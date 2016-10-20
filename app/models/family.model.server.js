var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FamilySchema = new Schema({
    created : {
        type: Date,
        default : Date.now
    },
    familyName : {
        type:String,
        required: "Family Name required"
    },
    familyID : {
        type: String,
    },
    familyPin : {
        type: String,
        required: "PIN required"
    },
});

mongoose.model('Family', FamilySchema);
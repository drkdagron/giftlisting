var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FamilySchema = new Schema({
    created : {
        type: Date,
        default : Date.now
    },
    familyID : {
        type: String,
        required: "ID required"
    },
    familyPin : {
        type: String,
        required: "PIN required"
    },
    members : {
        type: [{type:ObjectId, ref: 'User'}],
    },
});
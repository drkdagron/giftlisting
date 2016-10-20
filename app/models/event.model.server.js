var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema = mongoose.model('User');

var ItemSchema = new Schema({

    owner : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    itemName : { 
        type:String
    },
    gotten : {
        type:Boolean, 
        default:false 
    }
});

var EventSchema = new Schema({
    created : {
        type: Date,
        default : Date.now
    },
    eventOwner : { 
        type: Schema.Types.ObjectId, ref: 'User'
    },
    eventOwnerName: {
        type: String
    },
    eventName : {
        type:String,
        required: "Event Name required"
    },
    eventID : {
        type: String
    },
    eventPin : {
        type: String,
        required: "PIN required"
    },
    eventItems : {
        type: [ItemSchema]
    },
    eventDisplayPersonal : {
        type : Boolean,
        default: false
    },
});

mongoose.model('Item', ItemSchema);
mongoose.model('Event', EventSchema);
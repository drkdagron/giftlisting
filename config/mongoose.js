var config = require('./config'),
mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
   
    //require('../app/models/items.model.server'); 
    require('../app/models/user.model.server');
    require('../app/models/event.model.server');
    require('../app/models/family.model.server');


    
    return db;
};
var users = require('../../app/controllers/user.controller.server'),
    event = require('../../app/controllers/event.controller.server');

module.exports = function(app) {    
    app.route('/api/event')
        .get(event.list)
        .post(event.create);
    app.route('/api/event/:eventId')
        .get(event.listone);
    app.route('/api/event/all')
        .get(event.listall);
    app.route('/api/event/:eventId/item') 
        .get(event.listitems)
        .post(event.additem);
    app.route('/api/event/:eventId/item/:itemId')
        .get(event.listItem)
        .put(event.updateItem);
    app.route('/api/event/join')
        .post(event.joinEvent);
    
    //app.param('userId', event.getUser);
    app.param('eventId', event.eventById);
    app.param('itemId', event.itemById);
};
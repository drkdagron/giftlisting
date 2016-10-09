module.exports = function(app) {
    var index = require('../controllers/index.controller.server.js');
    app.get('/', index.render);
};
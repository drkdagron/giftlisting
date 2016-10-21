var mongoose = require('mongoose'), Event = mongoose.model('Event'), Item = mongoose.model('Item'), User = mongoose.model('User');

//Listing all events (GET)
exports.list = function(req, res)
{
    //console.log("listing");
    Event.find().populate("eventOwner").sort('-created').limit(10).exec(function (err, events){
        //console.log(events[0]);
        if (err) { return res.status(400).send({message: "I fucked up"});}
        else { res.json(events); }
    });
}

exports.listall = function(req, res)
{
    //console.log("listing");
    Event.find().populate("eventOwner").sort('-created').exec(function (err, events){
        if (err) { return res.status(400).send({message: "I fucked up"});}
        else { res.json(events); }
    });
}

exports.getMyEvent = function(req, res)
{
    User.findOne(req.user._id).populate("events").exec(function(err, user) {
        if (err) return res.status(400).send({message: err});

        res.json(user.events);
    });
}

exports.joinEvent = function(req, res)
{
    Event.findOne({eventID: req.body.eventID, eventPin: req.body.eventPin}).populate("eventOwner").exec(function(err, event) {
        if (err) { return res.status(400).send({message: "No :("})}
        if (event != null)
        {
            console.log(event);
            User.findById(req.body.eventUser).exec(function(err, user) {
                user.events.push(event._id);
                user.save(function(err, response) {
                    if (err) return res.status(400).send({message:"error with user saving: " + err});

                    res.json(user);
                });
            });
        }
    });
}
exports.getUser = function(req, res, next, id)
{
    console.log("GETTING USER");
    User.findById(id).exec(function(err, user) {
        req.user = user;
        next();
    });
}
exports.getEvent = function(req, res, next, id)
{
    Event.findById(id).exec(function(err, user) {
        req.event = event;
        next();
    });
}

createID = function()
{
    var allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
    var id = "";

    for (var i= 0; i < 8; i++)
    {
        id += allowed[Math.floor(Math.random() * allowed.length)];
    }

    return id;
}

//creating an event (POST)
exports.create = function(req, res, next)
{
    console.log(req.body);
    req.body.eventID = createID();
    var event = new Event(req.body);
    console.log(req.body);
    
    event.save(function (err) {
        if (err) { return res.status(400).send({message: "I fucked up"})}
         
        User.findById(req.body.eventOwner).exec(function(err, user) {
            user.events.push(event._id);
            user.save(function (err) {
                if (err) { return res.status(400).send({message: err}); }
                res.json(event);
            });
        });
    });
}

//Finding a singular event
exports.eventById = function(req, res, next, id)
{
    Event.findById(id).populate('eventItems.owner').exec(function (err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));

        req.event = event;
        next();
    });
}
exports.listone = function(req, res, next)
{
    res.json(req.event);
}

//list all items for the event
exports.itemById = function(req, res, next, id)
{
    for (var i = 0; i < req.event.eventItems.length; i++)
    {
        if (req.event.eventItems[i]._id == id)
            {
                req.item = req.event.eventItems[i];
                next();
            }
    }
}

exports.listitems = function(req, res, next)
{
    res.send(req.event.eventItems);
}

exports.additem = function(req, res, next)
{
    var item = new Item(req.body);
    console.log(req.body);
    req.event.eventItems.push(item);
    req.event.save(function (err) {
        res.send(req.event);
    });
}

exports.listItem = function(req, res, next)
{
    res.json(req.item);
}

exports.updateItem = function(req, res, next)
{
    Event.findById(req.params.eventId).exec(function (err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));

        for (var i = 0; i < event.eventItems.length; i++)
        {
            if (event.eventItems[i]._id == req.params.itemId)
            {
                event.eventItems[i].gotten = req.body.gotten;
                event.save(function() {return res.json(event)}); 
            }
        }
    });
}
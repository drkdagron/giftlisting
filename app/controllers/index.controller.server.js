exports.render = function(req, res)
{
    res.render('index', {
        userFullName:JSON.stringify(req.user),
        messages: req.flash('error')
    });
};
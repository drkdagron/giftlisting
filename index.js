var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('hello world');
})

app.listen(3000, function() { console.log("Listening to 3000"); });
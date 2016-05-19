// Express Config
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));

// Include controllers
var controllers = require('./controllers');

// Routes
app.get('/', function(req, res) { res.send("hi"); });
app.get('/geo/:lat/:lon', controllers.DistrictsController.showAllByGeo);

// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

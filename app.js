// Express Config
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

// DB Config
var query = require('pg-query');
query.connectionParameters = process.env.DATABASE_URL;

var controllers = require('./controllers');

// Routes
app.get('/geo/:lat/:lon', controllers.DistrictsController.showAllByGeo);
app.get('/geo/precinct/:lat/:lon', controllers.DistrictsController.showPrecinctByGeo);
app.get('/geo/county/:lat/:lon', controllers.DistrictsController.showCountyByGeo);

// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

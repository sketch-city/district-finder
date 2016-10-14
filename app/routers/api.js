// Load express
var express = require('express');

// Load the controllers
var controllers = require('../controllers');

// Create the router object
var api = express.Router();

// Build the routes
api.get('/', function(req, res) {
  res.send(`
    Sorry for the lame in a hurry documentation!
    <br><br>
    Fetch a list of districts the point is inside of:
    <br>
    <code>https://districtfinder.texasvotes.io/api/geo/{latitude}/{longitude}</code>
    <br><br>
    Example Output:
    <pre>
[
  {
    name: "0016",
    type: "County Election Precinct"
  },
  {
    name: "Harris",
    type: "County"
  }
]
    </pre>
  `);
});
api.get('/geo/:lat/:lon', controllers.DistrictsController.allByLatLon);
api.get('/regions', controllers.DistrictsController.getRegions);
api.get('/region-types', controllers.DistrictsController.getRegionTypes);
api.get('/uploads', controllers.DistrictsController.getUploads);

module.exports = api;

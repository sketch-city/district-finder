// Load express
var express = require('express');

// Load the controllers
var controllers = require('../controllers');

// Create the router object
var api = express.Router();

// Build the routes
api.get('/', function(req, res) { res.send("Wait! It's not documented yet. Check out what the example is doing."); });
api.get('/geo/:lat/:lon', controllers.DistrictsController.allByLatLon);

module.exports = api;

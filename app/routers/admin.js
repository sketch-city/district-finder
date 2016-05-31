// Load express
var express = require('express');

/** @todo add middleware to handle auth before production. */

// Middleware to handle file uploads
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

// Load the controllers
var controllers = require('../controllers');

// Create the router object
var admin = express.Router();

// Build the routes
admin.get('/', function(req, res) { res.send('This is the admin home page.'); });
admin.post('/region', upload.single('region_file'), controllers.DistrictsController.addRegion);
admin.post('/region-type', controllers.DistrictsController.addRegionType);
admin.get('/region-types', controllers.DistrictsController.getRegionTypes);


module.exports = admin;

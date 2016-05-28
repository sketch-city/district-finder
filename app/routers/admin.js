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
admin.post('/create/region', upload.single('region_file'), controllers.DistrictsController.addRegion);
admin.post('/create/region-type', controllers.DistrictsController.addRegionType);

module.exports = admin;

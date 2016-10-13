// Load express
var express = require('express');

// Middleware to handle file uploads
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

// Load the controllers
var controllers = require('../controllers');

// Create the router object
var admin = express.Router();

// Routes with views
admin.get('/', controllers.AdminController.adminRoot);
admin.get('/regions', controllers.AdminController.regions);
admin.get('/region-types', controllers.AdminController.regionTypes);
admin.get('/uploads', controllers.AdminController.uploads);

// Data adding and editing
admin.post('/region', upload.single('region_file'), controllers.DistrictsController.addRegion);
admin.post('/region-type', controllers.DistrictsController.addRegionType);


module.exports = admin;

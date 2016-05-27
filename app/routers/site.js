// Load express
var express = require('express');

// Load the controllers
var controllers = require('../controllers');

// Create the router object
var site = express.Router();

// Build the routes
site.get('/', function(req, res) { res.send("Hello, and welcome to the district finder API website."); });

module.exports = site;

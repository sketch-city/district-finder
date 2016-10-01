// Load express
var express = require('express');

// Load the controllers
var controllers = require('../controllers');

// Create the router object
var site = express.Router();

// Build the routes
site.get('/', function(req, res) {
  res.render('index');
});

site.get('/documentation', function(req, res) {
  res.locals.title = 'Documentation';
  res.render('documentation');
});

site.get('/example', function(req, res) {
  res.locals.title = 'Docs Example Page';
  res.render('example');
});

module.exports = site;

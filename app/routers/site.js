// Load express
var express = require('express');

// Load the controllers
var controllers = require('../controllers');

// Create the router object
var site = express.Router();

// Build the routes
site.get('/', function(req, res) {
  res.locals.title = 'District Finder';
  res.render('index');
});

site.get('/example', function(req, res) {
  res.locals.title = 'Docs Example Page';
  res.render('example');
});

module.exports = site;

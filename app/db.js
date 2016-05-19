var config = require('../knexfile.js');
var env    = process.env.ENVIRONMENT || 'development';
var knex   = require('knex')(config[env]);

module.exports = knex;

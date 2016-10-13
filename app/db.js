var config = require('../knexfile.js');
var env    = process.env.ENVIRONMENT || 'development';
var knex   = require('knex')(config[env]);

console.log("Running DB migrations...");
knex.migrate.latest();
console.log("Completed DB migrations...");

module.exports = knex;

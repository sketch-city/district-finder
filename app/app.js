// Configure Express
var express = require('express');
var app = express();
var basicauth = require('basicauth-middleware');
app.set('port', (process.env.PORT || 8000));

// Static files like CSS/JS/images to make available
app.use('/static', express.static('app/assets'));

// Configure handlebars
var hbs = require('./handlebars.js');
app.set('view engine', 'hbs');
app.set('views', 'app/views');
hbs.registerPartials('app/views/partials');

// Handle POST requests with content types application/json and application/x-www-form-urlencoded
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Include routers
var router = require('./routers');
app.use('/', router.site);
app.use('/api', router.api);
app.use('/admin', basicauth(process.env.ADMINUSER, process.env.ADMINPASS), router.admin);

// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

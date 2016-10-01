var hbs = require('hbs');
var Handlebars = hbs.handlebars;
var helpers = require('./handlebarsHelpers');

hbs.registerHelper('optionWithDepth', function(object) {
  var id = Handlebars.escapeExpression(object.id);
  var name = Handlebars.escapeExpression(helpers.textFormatting.formatDepth(object.name, object.depth, '-', '|'));

  return new Handlebars.SafeString("<option value='" + id + "'>" + name + "</option>");
});

module.exports = hbs;

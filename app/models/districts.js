// DB Config
var knex  = require('../db');

var Districts = {

  allByLatLon: function allByLatLon(lat, lon, callback) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    var point = { 'point': 'POINT('+lon+' '+lat+')' };

    knex.select('name').from('regions')
        .whereRaw("ST_Contains(geom, ST_GeometryFromText(:point, 4326))", point)
        .then(function(rows) {
          callback(rows);
        })
        .catch(function(error) {
          callback(error);
        });

  }
};

module.exports = Districts;

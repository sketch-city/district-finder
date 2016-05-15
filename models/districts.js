var query = require('pg-query');

var Districts = {

  countyByLatLon: function(lat, lon, cb) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    var q = "SELECT county from precincts where ST_Contains(wkb_geometry, ST_GeometryFromText('POINT(" + lon + " " + lat + ")', 4326))";
    query(q, cb);
  },

  precinctByLatLon: function(lat, lon, cb) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    var q = "SELECT precinct from precincts where ST_Contains(wkb_geometry, ST_GeometryFromText('POINT(" + lon + " " + lat + ")', 4326))";
    query(q, cb);
  }
};

module.exports = Districts;

var query = require('pg-query');

var Districts = {
  precinctsByLatLon: function(lat, lon, cb) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    var q = "SELECT precinct, county from precincts where ST_Contains(geom, ST_GeometryFromText('POINT(" + lon + " " + lat + ")', 4326))";
    query(q, cb);
  }
};

module.exports = Districts;

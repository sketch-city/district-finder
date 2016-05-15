var Districts = require('../models/districts');

var DistrictsController = {

  showPrecinctByGeo: function showPrecinctByGeo(req, res) {
    var lat = req.params.lat;
    var lon = req.params.lon;
    Districts.precinctByLatLon(lat, lon, function(err, rows, result) {
      if (err) { console.log(err); }

      res.send(rows[0]);
    });
  },

  showCountyByGeo: function showCountyByGeo(req, res) {
    var lat = req.params.lat;
    var lon = req.params.lon;
    Districts.countyByLatLon(lat, lon, function(err, rows, result) {
      if (err) { console.log(err); }

      res.send(rows[0]);
    });
  }
};

module.exports = DistrictsController;

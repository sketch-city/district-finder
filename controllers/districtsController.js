var Districts = require('../models/districts');

var DistrictsController = {

  showAllByGeo: function showAllByGeo(req, res) {
    var lat = req.params.lat;
    var lon = req.params.lon;

    res.districts = {};

    Districts.precinctByLatLon(lat, lon, function(err, rows, result) {
      res.districts.precinct = rows[0].precinct;

      Districts.countyByLatLon(lat, lon, function(err, rows, result) {
        res.districts.county = rows[0].county;

        res.send(res.districts);
      });
    });
  },

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

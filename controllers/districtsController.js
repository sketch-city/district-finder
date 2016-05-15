var Districts = require('../models/districts');

var DistrictsController = {

  showPrecinctByGeo: function showPrecinctByGeo(req, res) {
    var lat = req.params.lat;
    var lon = req.params.lon;
    Districts.precinctsByLatLon(lat, lon, function(err, rows, result) {
      if (err) { console.log(err); }
      
      res.send(rows);
    });
  }
};

module.exports = DistrictsController;

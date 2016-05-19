var Districts = require('../models/districts');

var DistrictsController = {


  showAllByGeo: function showAllByGeo(req, res) {
    var lat = req.params.lat;
    var lon = req.params.lon;
    Districts.allByLatLon(lat, lon, function(data) {
      res.send(data);
    });
  }


};

module.exports = DistrictsController;

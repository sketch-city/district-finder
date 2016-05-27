var Districts = require('../models/districts');


/**
 * Districts Controller
 */
var DistrictsController = {


  /**
   * Get all the regions by a lat/lon pair.
   */
  allByLatLon: function(req, res) {
    var lat = req.params.lat;
    var lon = req.params.lon;

    Districts.allByLatLon(lat, lon, function(data) {
      res.send(data);
    });
  },


  /**
   * Add uploaded region to DB.
   *
   * @todo throw an error if no file was uploaded
   */
  addRegion: function(req, res) {
    var typeId       = req.body.type_id;
    var expiresAt    = req.body.expires_at;
    var parentRegion = req.body.parent_region;
    var nameProperty = req.body.name_property;
    var regionFile   = {};

    // Did a file actually get uploaded?
    if (req.file) { regionFile = req.file; }

    Districts.addRegion(typeId, expiresAt, parentRegion, nameProperty, regionFile, function(data) {
      res.send(data);
    });
  },


  /**
   * Add a region type record to the DB.
   */
  addRegionType: function(req, res) {
    var regionName = req.body.region_name;
    var childOf = req.body.child_of;

    Districts.addRegionType(regionName, childOf, function(data) {
      res.send(data);
    });
  }


};

module.exports = DistrictsController;

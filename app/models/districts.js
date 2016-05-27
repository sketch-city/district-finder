var knex  = require('../db');
var geo = require('../helpers/geo');


/**
 * Districts Model
 */
var Districts = {


  /**
   * Finds all geometries that contain a lat/lon.
   *
   * @param {number}   lat - The latitude.
   * @param {number}   lon - The longitude.
   * @param {function} cb  - The callback to render the view.
   */
  allByLatLon: function(lat, lon, cb) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    var point = { 'point': 'POINT('+lon+' '+lat+')' };

    knex.select('name')
        .from('regions')
        .whereRaw("ST_Contains(geom, ST_GeometryFromText(:point, 4326))", point)

        .then(function(rows) {
          cb(rows);
        })
        .catch(function(error) {
          cb(error);
        });
  },


  /**
   * Adds an uploaded region to the database.
   *
   * @param {number}   typeId       - The type of region.
   * @param {datetime} expiresAt    - When the region may change by.
   * @param {number}   parentRegion - The parent region. If it's expiration is sooner, use it instead.
   * @param {string}   nameProperty - The column/property name in the shp/geojson file to associate data with.
   * @param {Object}   geojson      - The data from the upload in geojson.
   * @param {function} cb           - The callback to render the view.
   */
  addRegion: function(typeId, expiresAt, parentRegion, nameProperty, regionFile, cb) {

    // Build metadata
    var uploadsData = {
      'type_id': typeId,
      'expires_at': expiresAt,
      'parent_region': parentRegion
    };

    // Prepare uploaded shp/geojson for DB
    var geojson = geo.parseRegionFile(regionFile);
    var regionGeoms = geo.geojson2array(geojson, nameProperty);

    cb([uploadsData, regionGeoms]);
  },


  /**
   * Adds a provided region type to the database.
   *
   * @param {string}   regionName - The name of the region.
   * @param {number}   childOf    - The id of a parent region type.
   * @param {function} cb         - The callback to render the view.
   */
  addRegionType: function(regionName, childOf, cb) {

    // Build the data to insert
    var data = {
      'name': regionName,
      'child_of': childOf
    };

    // Build and run the SQL query
    knex('region_types').insert(data, 'id')
    .then(function(id) {
      cb(id);
    })
    .catch(function(error) {
      cb(error);
    });
  }


};

module.exports = Districts;

var fs = require('fs');

/**
 * Geo helper library.
 * A mixture of existing tools and some custom functions specifically for this app.
 */
var geo = {


  /**
   * Load region file, validate, and parse into a JSON object.
   *
   * @param {Object} regionFile - The file object from multer. {@link https://github.com/expressjs/multer}
   *
   * @todo Validate geojson as a FeatureCollection
   * @todo Convert shapefiles to geojson if that's what gets uploaded
   * @todo Reproject to WGS 84 with something like this: {@link https://github.com/perliedman/reproject}
   */
  parseRegionFile: function(regionFile) {
    var file = JSON.parse( fs.readFileSync(regionFile.path) );

    // Remove the file since we don't need it anymore
    fs.unlinkSync(regionFile.path);
    
    return file;
  },


  /**
   * Restructures geojson for easier insertion into the database.
   *
   * @param {Object} geojson      - A geojson feature collection with polygons and properties.
   * @param {string} nameProperty - The specific feature property to associate with the shape in the DB.
   */
  geojson2array: function(geojson, nameProperty) {
    var polygonArray = [];

    for (var i = 0; i < geojson.features.length; i++) {
      polygonArray[i] = {};
      polygonArray[i].name = geojson.features[i].properties[nameProperty];
      polygonArray[i].geom = geojson.features[i].geometry;
    }

    return polygonArray;
  }
};

module.exports = geo;

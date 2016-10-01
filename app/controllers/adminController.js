var Districts = require('../models/districts');
var moment = require('moment');
var _ = require('lodash');

/**
 * Admin Controller
 */
var AdminController = {


  adminRoot: function(req, res) {
    res.redirect('/admin/regions');
  },


  regions: function(req, res) {
    Districts.getRegions(function(data) {
      res.locals.title = 'Regions';

      _.map(data, function(region) {
        region.expires_at = moment(region.expires_at).fromNow();
        return region;
      });

      res.locals.regions = data;
      res.render('regions', {layout: 'adminLayout'});
    });
  },


  regionTypes: function(req, res) {
    Districts.getRegionTypes(function(data) {
      res.locals.title = 'Region Types';
      res.locals.regionTypes = data;
      res.render('regionTypes', {layout: 'adminLayout'});
    });
  },


  uploads: function(req, res) {
    Districts.getUploads(function(data) {
      res.locals.title = 'Uploads';

      _.map(data, function(upload) {
        upload.expires_at = moment(upload.expires_at).fromNow();
        upload.uploaded_at = moment(upload.uploaded_at).fromNow();
        return upload;
      });

      res.locals.uploads = data;
      res.render('uploads', {layout: 'adminLayout'});
    });
  },


};

module.exports = AdminController;

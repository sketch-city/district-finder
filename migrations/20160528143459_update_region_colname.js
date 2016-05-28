/**
 * parent_region is a more descriptive name to use here
 */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('uploads', function (table) {
      table.renameColumn('parent', 'parent_region');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('uploads', function (table) {
      table.renameColumn('parent_region', 'parent');
    })
  ]);
};

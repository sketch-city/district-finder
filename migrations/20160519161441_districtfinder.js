
exports.up = function(knex, Promise) {
  return Promise.all([

    // Create region types table to store core meta and relationship data
    knex.schema.createTable('region_types', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('child_of').references('id').inTable('region_types');
    }),

    // Create uploads table to store metadata on region sets
    knex.schema.createTable('uploads', function(table) {
      table.increments('id').primary();
      table.dateTime('uploaded_at');
      table.dateTime('expires_at');
      table.integer('type_id').references('id').inTable('region_types');
      table.integer('parent').references('id').inTable('uploads');
    }),

    // Create regions table to store geometries
    knex.schema.createTable('regions', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.specificType('geom', 'geometry(MULTIPOLYGON, 4326)');
      table.integer('uploads_id').references('id').inTable('uploads');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('regions'),
    knex.schema.dropTableIfExists('uploads'),
    knex.schema.dropTableIfExists('region_types')
  ]);
};

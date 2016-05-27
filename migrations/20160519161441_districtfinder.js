
exports.up = function(knex, Promise) {
  return Promise.all([

    // Create region types table to store core meta and relationship data
    knex.schema.createTable('region_types', function(table) {
      table.increments('id').primary();

      table.string('name').unique().notNullable()
           .comment('Name of region type. Examples: City, County, Voting Precinct. Required.');

      table.integer('child_of').references('id').inTable('region_types')
           .comment('Is this a subdivision of another type\\? Example: State > County > County Comissioner Precinct');
    }),

    // Create uploads table to store metadata on region sets
    knex.schema.createTable('uploads', function(table) {
      table.increments('id').primary();

      table.timestamp('uploaded_at', true).defaultTo(knex.fn.now()).notNullable()
           .comment('When was the file uploaded\\?');

      table.timestamp('expires_at', true)
           .comment('When can the geometries uploaded legally change\\?');

      table.integer('type_id').references('id').inTable('region_types').notNullable()
           .comment('What type of region is this\\?');

      table.integer('parent').references('id').inTable('uploads')
           .comment('Keep track of subdivisions. If a county changes shape, its children will too.');
    }),

    // Create regions table to store geometries
    knex.schema.createTable('regions', function(table) {
      table.increments('id').primary();

      table.string('name').notNullable()
           .comment('Examples with descriptors: 0570 (voting precinct), Houston (city), Fort Bend ISD (school district)');

      table.specificType('geom', 'geometry(MULTIPOLYGON, 4326)').notNullable()
           .comment('Geometry in the EPSG:4326/WGS 84 coordinate system. The most important part of this whole thing.');

      table.integer('uploads_id').references('id').inTable('uploads').notNullable()
           .comment('Which batch of uploads does this geometry belong to\\?');
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

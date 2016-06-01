/**
 * Adding metadata to the uploads table.
 */

exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('uploads', function (table) {
        table.string('upload_name').comment('Identifying information about the upload.');
        table.string('file_name').comment('The name of the file being uploaded.');
      })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('uploads', function (table) {
        table.dropColumn('upload_name');
        table.dropColumn('file_name');
      })
    ]);
};

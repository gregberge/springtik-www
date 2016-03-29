exports.up = (knex, Promise) =>
  knex.schema
    .raw('ALTER TABLE categories ALTER COLUMN description SET DEFAULT \'\'')
    .raw('UPDATE categories SET description=\'\' WHERE description IS NULL')
    .raw('ALTER TABLE categories ALTER COLUMN description SET NOT NULL')
    .raw('ALTER TABLE categories ALTER keywords SET DEFAULT json_build_array()')
    .raw('UPDATE categories SET keywords=json_build_array() WHERE keywords IS NULL')
    .raw('ALTER TABLE categories ALTER keywords SET NOT NULL');

exports.down = (knex, Promise) =>
  knex.schema
    .raw('ALTER TABLE categories ALTER COLUMN description DROP DEFAULT')
    .raw('ALTER TABLE categories ALTER COLUMN description DROP NOT NULL')
    .raw('ALTER TABLE categories ALTER COLUMN keywords DROP DEFAULT')
    .raw('ALTER TABLE categories ALTER COLUMN keywords DROP NOT NULL');

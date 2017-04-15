module.exports = (db_location) => {
  
  const lowdb = require('lowdb');

  let db = lowdb(db_location);

  // define defaults for db
  db.defaults({ bindings: [] }).write();

  return db;

}

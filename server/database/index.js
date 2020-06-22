// Create database connection with the backend: writing a class to integrate postgreSQL and node.js
// when database is called, such as import datbase from './datbase/index_copy.js, instead, we can use './datbase' since it automatically looks for index.js in database so more conventient to name the file index.js
var { Pool } = require('pg'); //import pool from postgreSQL, this is the interface to interact with a pg instance that is installed whether local or when we deply our app to Heroku

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/weather-db';
const SSL = process.env.NODE_ENV === 'production'; // SSL is true or false 

// class methods
class Database {
  constructor () {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });

    this._pool.on('error', (err, client) => {
      console.error('Unexpected error on idle PostgreSQL client.', err);
      process.exit(-1);
    });

  }

  query (query, ...args) {
    this._pool.connect((err, client, done) => {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: 'Database error.' }, null);
        }
        callback({}, res.rows);
      });
    });
  }

  end () {
    this._pool.end();
  }
}

module.exports = new Database(); // export the class so it can be used, export a new instance of database
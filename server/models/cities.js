const db = require('../database'); //.. means the parent directory

class Cities {
  static retrieveAll (callback) {
    db.query('SELECT city_name from cities', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res); // callback is used to pass a function to another function
    });
  }

  static insert (city, callback) {
    db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Cities;
// APT that allows us to send and receive data from the frontend to the backend
var express = require('express');
var Cities = require('../models/cities');

var router = express.Router();// a module that handles all mid-ware from a particular backend (this case cities)

router.get('/', function(req, res) { // res: response; use function() or add "=>" before{}; get is used when you retrieve data from the server
  Cities.retrieveAll((err, cities) => {
    if (err)
      return res.json(err);
    return res.json(cities);
  });
});

// to set up the functionality to add a new city, insert into cities table database
router.post('/', function(req, res) {// req: request; post is used when you sending data 
  var city = req.body.city;

  Cities.insert(city, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
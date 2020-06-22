// Express backend:

const path = require("path"); // Node.js to open files
const express = require("express"); // backend server framework we are using
const bodyParser = require("body-parser"); // http interactions with front end and back end

var db = require('./database');
const { ifError } = require("assert");

const ENV = process.env.NODE_ENV; // provide node environment, whether in development or production, based on which we can make certain changes in the backend process 
const PORT = process.env.PORT || 5000; // port that express server running on; if process provide a prot, using it, o.w. use 5000

//initiate express and register the basic midware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/cities', require('./api/cities'));
app.use('/api/weather', require('./api/weather'));

// make code so that express can respond to request throght a port;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`); // instead of printout this sentence everytime the server runs, we modify the script in the package.json with "server": "nodemon server"
})

db.query('SELECT NOW()', (err, res) => {
    if(err.error)
      return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`); // the now column, row o.
});

// export this app variable from our file
module.exports = app;




// we can test the server by running: node server/index.js
// ctrl + c : stop server running;
// or run npm run server (after script in package.json has been modified)
// ctrl + s: save the index.js; if there is any changes, it will restart the server

var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();
var corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
var User = require('./api/models/User');
var routes = require('./api/routes/v1/signin');
var db_url = process.env.db_url;
var connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
console.log("DB URL: " + db_url);
mongoose.connect(db_url, connectionParams)
    .then(function () {
    console.log('Connected to database now');
})["catch"](function (err) {
    console.error("Error connecting to the database. \n" + err);
});
var PORT = process.env.PORT;
console.log('starting express');
var app = express();
/**
 * Configure express server middleware
 **/
// this allows us to parse HTTP POST request bodies 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
// For development - console each HTTP request to the server
app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " with param " + JSON.stringify(req.params));
    // For things like POST requests that have a body in the HTTP request, print that too
    if (req.body) {
        console.log(JSON.stringify(req.body));
    }
    // We need to call next() to tell express that our middleware function here is done and
    // that express should pass the request on to the next handling function - which will either
    // be more middleware or our routing code!
    next();
});
/** Express server routes */
app.get('/', function (req, res) {
    res.send('Hello World!');
});
/** Mount all our various API routes here */
app.use('/', routes);
app.use(cors(corsOptions));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
/** Start express server  */
app.listen(PORT, function () {
    console.log("Example app listening at http://localhost:" + PORT);
});

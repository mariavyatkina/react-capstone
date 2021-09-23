const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const User = require('./api/models/User');

const routes = require('./api/routes/v1/signin');

const DB_NAME = process.env.DB_NAME;
const DB = process.env.DB;
const DB_PORT = process.env.DB_PORT;
const DB_URL = `${DB}://localhost:${DB_PORT}/${DB_NAME}`
console.log("DB_URL:" + DB_URL)

mongoose.connection.on('open', () => `MongoDB: Successfully connected to ${DB_URL}`);
mongoose.connection.on('error', (error: any) => `MongoDB: Failed to connected to ${DB_URL}. Error ${error}`);

console.log('MongoDB: Attempting to connect ...');
mongoose
  .connect(DB_URL)
  // handle error messages after successfully connectiong
  .catch((error:any) => console.error(`MongoDB: Error ${error}`));

const SERVER_PORT = process.env.SERVER_PORT;

console.log('starting express')
const app = express();

/** 
 * Configure express server middleware 
 **/

// this allows us to parse HTTP POST request bodies 
app.use(express.json());

// For development - console each HTTP request to the server
app.use((req:any, res:any, next:any) => {
    console.log(`${req.method} ${req.path} with param ${JSON.stringify(req.params)}`);
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
  app.get('/', (req:any, res:any) => {
    res.send('Hello World!')
  })

  /** Mount all our various API routes here */
  app.use('/', routes);
  app.use(cors(corsOptions)) 
  /** Start express server  */
  app.listen(SERVER_PORT, () => {
    console.log(`Example app listening at http://localhost:${SERVER_PORT}`)
  })
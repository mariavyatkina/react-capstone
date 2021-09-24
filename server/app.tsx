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


const db_url = process.env.db_url;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
console.log("DB URL: " + db_url);
mongoose.connect(db_url,connectionParams)
    .then( () => {
        console.log('Connected to database now')
    })
    .catch( (err: any) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

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
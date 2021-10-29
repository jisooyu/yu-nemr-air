const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const passport = require('passport')
const keys = require('./config/keys')

// User를 passport보다 먼저 import 해야 함
require('./models/User')
require('./models/Air')
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
// app.user(express.json())
app.use(
    cookieSession({
        // expiration dates of cookie: 30 days
        maxAge: 2 * 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey] // multiple keys are allowed.
    })
)
app.use(express.json())  // req body parser
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app);
require('./routes/airRoutes')(app)

if ( process.env.NODE_ENV = 'production' ) {
    /*
    Express will server up production assets
    like our main.js or main.css files
    */
    app.use( express.static('client/build' ) );
  
    // Express will serve up index.html file
    // if it doen't recognize the route
    const path = require( 'path' );
    app.get( '*', ( req, res ) => {
      res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) );
    } );
  }
  
const PORT = process.env.PORT || 5000;
app.listen(PORT);

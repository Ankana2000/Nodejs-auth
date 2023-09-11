const express = require('express');
const app = express();
const port=8000;
const cookieParser=require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const passportGoogle= require('./config/passport-google-oauth2-strategy');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static('./assets'));
app.use(expressLayouts);


// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');


//setup of express session
//mongo strore is used to store session cookie
app.use(session({
  name: 'Authentication',
  secret: 'blahblaah',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: 1000 * 60 * 100 // Fixed the syntax here
  },
  store: MongoStore.create({
      //session to intract with mongoose
      mongoUrl:'mongodb+srv://ankumis2000:anku3421@cluster0.ahewrlp.mongodb.net/?retryWrites=true&w=majority',
      // mongooseConnection:db,
      //do i want to remove automatically is disabled
      autoRemove:'disabled'
  },
  function(err){
      console.log(err || 'connect-mongoose setup OK');
  })
}));


//passport js setup
app.use(passport.initialize());
app.use(passport.session());
// Use the checkAuthentication middleware
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);


app.use('/', require('./routes'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
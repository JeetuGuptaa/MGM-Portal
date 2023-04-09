const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose.js');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const flash = require('express-flash')
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended : false}));
app.use(express.static('./assets'));
app.use(session({
    name : 'college-session',
    secret: 'Management',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge : 1000 * 60 * 60 * 24 * 15
    },
    store: MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1/MGMPortal',
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setp ok');
    })
  }));
  
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log("Error in starting server", err);
        return ;
    }
    console.log("Server Started Successfully at port", port);
})
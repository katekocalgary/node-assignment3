const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const navInfo = require('./navInfo');

const router = require('./routes/subscription');
const dotenv = require('dotenv').config();
const app = express();


// Message display using express-flash, cookie-parser, express-session middleware
// http://www.coding4developers.com/node-js/send-message-on-redirect-in-node-js-redirect-with-message-node-js-flash-message-in-node-js/
// https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423

const cookieParser = require('cookie-parser')
const flash = require('express-flash');
const session = require('express-session');

app.use(session({
  secret: 'super-secret-key',
  key: 'super-secret-cookie',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(flash());
app.use(cookieParser());


// Set view engine 'ejs'
app.set('view engine','ejs'); 


// Create a get endpoint that accepts requests index
app.get('/', function(request, response){
  response.render('index', {menu: navInfo, page: 'Home'});
});


// Create a get endpoint that accepts requests page
app.get('/:page', function(request, response){
  if(request.accepts('ejs')) {
    response.send('404: File Not Found');
  } 
    const currentpage = request.params.page;
    response.render(request.params.page, {menu: navInfo, page: currentpage })
});

// Middleware for reading http post data
app.use(express.urlencoded({extended : false}));


// Create set connection.
mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('DB Connected');
});


// Add subscription route middleware
app.use('/subscription', router);


// Serve static assets
app.use(express.static(path.join(__dirname, 'assets')));

// Catch 404 error
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

// Set PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});


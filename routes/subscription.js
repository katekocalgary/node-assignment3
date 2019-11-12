/* * * * * * * * * * * * * * * * * * *
Router middleware for subscription
* * * * * * * * * * * * * * * * * * */

const express = require('express');
const router = express.Router();
const Subscribers = require('../models/subscribers.js');


// Message display using express-flash, cookie-parser, express-session middleware
// http://www.coding4developers.com/node-js/send-message-on-redirect-in-node-js-redirect-with-message-node-js-flash-message-in-node-js/
// https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423


// Accepts post data from subscription page
router.post('/', function(req, res){

    // Inserts a record into MongodDB Atlas via mongoose model
    const subscribers = new Subscribers(req.body);

    subscribers.save(function(err){

        // error: redirect back to form with fail message
        if(err) {
            console.log(err);
            req.flash('subFailMsg', 'Sorry, Something went wrong while register your subscription.');
            res.redirect('/subscription');
        }

        // Success : redirects user back to home page with success message
        else{
            const name = req.body.name
            const email = req.body.email
            req.flash('subSccessMsg',`Thank you, ${name}! You can get updated information to your email: ${email}`);
            res.redirect('/');
        }
    });
});

module.exports = router;
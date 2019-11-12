/* * * * * * * * * * * * * * * * * * *
DB Schema for Subscribers
* * * * * * * * * * * * * * * * * * */

const mongoose = require('mongoose');

const subscribersSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true
        },
        adult : {
            type : Boolean,
            default : false
        }
    }
);

const Subscribers = mongoose.model('Subscribers', subscribersSchema);

module.exports = Subscribers;
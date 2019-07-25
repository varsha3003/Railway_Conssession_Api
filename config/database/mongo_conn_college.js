const mongoose = require('mongoose');

// Promise.promisifyAll(require("mongoose"));

var mongoConn= mongoose.createConnection('mongodb+srv://Varsha123:@testdb-hackathon-wkzww.mongodb.net/College',{user: 'Varsha123', pass: '7My7WdLdzau8qqf'});

mongoConn.on('error', console.error.bind(console, 'Connection error: '));
mongoConn.once('open', function(callback) {
//The code in this asynchronous callback block is executed after connecting to MongoDB.
    console.log('Successfully connected to CollegeDB.');
});
module.exports = mongoConn;
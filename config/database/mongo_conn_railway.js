const mongoose = require('mongoose');

// Promise.promisifyAll(require("mongoose"));

var mongoConnRailway= mongoose.createConnection('mongodb+srv://Varsha123:@testdb-hackathon-wkzww.mongodb.net/Railway',{user: 'Varsha123', pass: '7My7WdLdzau8qqf'});

mongoConnRailway.on('error', console.error.bind(console, 'Connection error: '));
mongoConnRailway.once('open', function(callback) {
//The code in this asynchronous callback block is executed after connecting to MongoDB.
    console.log('Successfully connected to RailwayDB.');
});
module.exports = mongoConnRailway;
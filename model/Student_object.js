var mongoose =require('mongoose');
var mongoConn = require('../config/database/mongo_conn_college');

var Schema=mongoose.Schema;

var schema=new Schema({
	
	
},{strict:false});

var Student = mongoConn.model('Student',schema,'Student');
module.exports=Student;

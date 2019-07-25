var mongoose =require('mongoose');
var mongoConnRailway = require('../config/database/mongo_conn_railway');

var Schema=mongoose.Schema;

var schema=new Schema({
	
	
},{strict:false});

var College = mongoConnRailway.model('College',schema,'College');
module.exports=College;

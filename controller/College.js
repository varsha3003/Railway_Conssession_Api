var College = require('../model/College_object');
var mongoConnRailway = require('../config/database/mongo_conn_railway');


exports.register = (req,res,next) => {

	function CollegeRegister(){
		return new Promise((resolve,reject) => {
			if (req.body.password !== req.body.passwordConf) {
				res.status(400).json({message:"Password does not match!!"});
			}
			if (req.body.email && req.body.collegeName && req.body.collegeId && req.body.address  && req.body.password && req.body.passwordConf) {
				var College_object = {
					"email": req.body.email,
					"collegeName": req.body.collegeName,
					"collegeId":parseInt(req.body.collegeId),
					"address":req.body.address,
					"password": req.body.password,
				};
				College
				.find({$or:[{'email':req.body.email},{'collegeId':req.body.collegeId},{'collegeName':req.body.collegeName}]})
				.then((college) =>{
					if(college.length == 0){
						mongoConnRailway.collection('College').insert(College_object);
						res.status(200).json({message:"College registered Successfully!!"});
					}
					else{
						if(req.body.collegeId == JSON.parse(JSON.stringify(college[0])).collegeId){
							console.log("has something");
							res.status(400).json({message:"CollegeId already registered!!"});
						}
						else if(req.body.collegeName ==JSON.parse(JSON.stringify(college[0])).collegeName){
							res.status(400).json({message:"CollegeName already registered!!"})	
						}
						else if(req.body.email == JSON.parse(JSON.stringify(college[0])).email){
							res.status(400).json({message:"Email already registered!!"})
						}
					}
				})
				.catch((error)=>{
					console.log(error);
				})
			}
			else{
				res.status(400).json({message:"All fields are required!!"});
			}
		})
	}
	CollegeRegister().then(function(result){
		console.log(result);

	});
}

exports.login = (req,res,next) => {

	function CollegeLogin(){
		return new Promise((resolve,reject) => {
			if(req.body.collegeId && req.body.password){
				College
				.find({$and:[{'password':req.body.password},{'collegeId':parseInt(req.body.collegeId)}]})
				.then((college) =>{
					console.log(college);
					if(college.length == 0){
						res.status(404).json({message:"College not Found!!"});
					}
					else{
						res.status(200).json({message:"Successfully Logged in!!"});
					}
				})
				.catch((error) =>{
					console.log(error);
				})
			}
		})
	}
	function getCollegeDetails(){
		return new Promise((resolve,reject) =>{
			College
			.find({'collegeId':parseInt(req.body.collegeId)})
			.select({_id:0,password:0})
			.then((college)=>{
				res.json({college});
			})
			.catch((error)=>{
				console.log(error);
			})
		})
	}
	try{
		if(req.body.password == null){
			getCollegeDetails().then(function(result){
				console.log(result);
			});
		}
		else{
			CollegeLogin().then(function(result){
				console.log(result);
			});
		}
	}
	catch(error){
		console.log(error);
	}
}

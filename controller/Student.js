var Student = require('../model/Student_object');
var mongoConn = require('../config/database/mongo_conn_college');
var College = require('../model/College_object');
var mongoConnRailway = require('../config/database/mongo_conn_railway');
var dateFormat = require('dateformat');


exports.register = (req,res,next) => {
	
	function StudentRegister(){
		return new Promise((resolve,reject) => {

			if (req.body.password !== req.body.passwordConf) {
				res.status(400).json({message:"Password does not match!!"});
			}

			if (req.body.email && req.body.studentName && req.body.sapId && req.body.collegeName && req.body.address && req.body.gender && req.body.password && req.body.passwordConf) {

				var Student_object = {
					"email": req.body.email,
					"studentName": req.body.studentName,
					"sapId":parseInt(req.body.sapId),
					"collegeName":req.body.collegeName,
					"address":req.body.address,
					"gender":req.body.gender,
					"password": req.body.password,
					"status":0,
					"details":[]
				};

				Student
				.find({$or:[{'email':req.body.email},{'sapId':req.body.sapId}]})
				.then((student) =>{
					console.log(student);
					if(student.length == 0){
						mongoConn.collection('Student').insert(Student_object);
						res.status(200).json({message:"Student registered Successfully!!"});
					}
					else{
						if(req.body.sapId == student[0].sapId){
							res.status(400).json({message:"SapId already registered!!"});
						}
						else if(req.body.email == student[0].email){
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
	StudentRegister().then(function(result){
		console.log(result);
	});
}

exports.login = (req,res,next) => {
	
	function StudentLogin(){
		return new Promise((resolve,reject) => {

			if(req.body.sapId && req.body.password){

				Student
				.find({$and:[{'password':req.body.password},{'sapId':parseInt(req.body.sapId)}]})
				.then((student) =>{
					console.log(student);
					student= JSON.parse(JSON.stringify(student));
					if(student.length == 0){
						res.status(404).json({message:"Student not Found!!"});
					}
					else{
						console.log(student);
						res.status(200).json({message:"Successfully Logged in!!"});
					}
				})
				.catch((error) =>{
					console.log(error);
				})
			}
		})
	}
	function getStudentDetails(){
		return new Promise((resolve,reject) =>{
			Student
			.find({"sapId":parseInt(req.body.sapId)})
			.then((student) =>{
				student= JSON.parse(JSON.stringify(student));
				console.log(student);
				College
				.find({'collegeName':student[0].collegeName})
				.then((college) => {
					console.log(college);
					var student_details={
						"Name":student[0].studentName,
						"SapId":student[0].sapId,
						"Email":student[0].email,
						"Address":student[0].address,
						"status":student[0].status,
						"College":student[0].collegeName,
						"CollegeAddress":JSON.parse(JSON.stringify(college[0])).address
					}
					res.json({student_details});
				})

			})

			
		})
	}
	try{
		if(req.body.password == null){
			getStudentDetails().then(function(result){
				console.log(result);
			})
		}
		else{
			StudentLogin().then(function(result){
				console.log(result);
			});

		}
	}
	catch(error){
		console.log(error);
	}
}

exports.updateStatus = (req,res,next) => {
	function updateStatus0(){
		return new Promise((resolve,reject) => {
			
			Student
			.findOne({"sapId":parseInt(req.body.sapId)})    
			.then((student)=>{
				console.log(student);
				console.log(JSON.parse(JSON.stringify(student)).status);
				var now = new Date();
				student.set('status',1);
				var form_details ={
					"to":req.body.to,
					"from":req.body.from,
					"class":req.body.class,
					"period":req.body.period,
					"appliedAt":now
				};
				
				console.log(form_details);
				Student
				.findOne({"sapId":parseInt(req.body.sapId)})
				.update({$push:{'details':form_details}})
				.then((newStudent)=>{
					console.log("saved");
					console.log(JSON.parse(JSON.stringify(student)).details);
				})
				student.save()
				.then((newstudent)=>{
					console.log("saved");
					res.json({message:"Status Updated!!"});
				})
			})
		})
	}
	function updateStatus1(){
		return new Promise((resolve,reject) => {
			
			Student
			.findOne({"sapId":parseInt(req.body.sapId)})    
			.then((student)=>{
				console.log(student);
				console.log(JSON.parse(JSON.stringify(student)).status);
				var now = new Date();
				student.set('status',(JSON.parse(JSON.stringify(student)).status+1)%3);
				student.save()
				.then((newstudent)=>{
					console.log("saved");
					res.json({message:"Status Updated!!"});
				})
			})
		})
	}
	try{
		if(req.body.class == null){
			updateStatus1().then(function(result){
				console.log(result);
			})
		}
		else{
			updateStatus0().then(function(result){
				console.log(result);
			})
		}
	}
	catch(error){
		console.log(error);
	}
}

exports.appliedList = (req,res,next) => {
	function StudentAppiled(){
		return new Promise((resolve,reject) => {

			Student
			.find({"status":1})
			.select({_id:0,password:0})
			.then((student)=>{
				if(student.length == 0){
					res.status(404).json({message:"No Student Available!!"});
				}
				else{
					res.status(200).json({student:student});
				}
			})
		})
	}
	StudentAppiled().then(function(result){
		console.log(result);
	})
}
exports.approvedList = (req,res,next) => {

	function StudentApproved(){
		return new Promise((resolve,reject) => {

			Student
			.find({"status":2})
			.select({studentName:1,sapId:1,collegeName:1,details:1,_id:0})
			.then((student)=>{
				if(student.length == 0){
					res.status(404).json({message:"No Student Available!!"});
				}
				else{
					res.status(200).json({student:student});
				}
			})
		})
	}
	StudentApproved().then(function(result){
		console.log(result);
	});
}
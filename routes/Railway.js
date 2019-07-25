var express = require('express');
var router = express.Router();

var Students = require('../controller/Student');
var Colleges = require('../controller/College');

router.post('/studentRegister',Students.register);
router.post('/studentLogin',Students.login);
router.post('/collegeRegister',Colleges.register);
router.post('/collegeLogin',Colleges.login);
router.post('/studentApplied',Students.appliedList);
router.post('/studentApproved',Students.approvedList);
router.post('/updateStatus',Students.updateStatus);


module.exports = router;

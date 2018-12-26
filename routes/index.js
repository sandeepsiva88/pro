var express = require('express');
var router = express.Router();
var monk = require('monk');
var db=monk('localhost:27017/tourist');
var sign=db.get('sign');
var collection=db.get('email');
var nodemailer=require('nodemailer');
var randomstring = require("randomstring");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2');
});
router.get('/index2', function(req, res, next) {
  res.render('index2');
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/service', function(req, res, next) {
  res.render('service');
});
router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});
router.get('/guide', function(req, res, next) {
  res.render('guide');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/help', function(req, res, next) {
  res.render('help');
});
router.get('/booknow', function(req, res, next) {
  res.render('booknow');
});
router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});

//user-signup

router.post('/sign',function(req,res){
var data={
	name:req.body.name,
	email:req.body.email,
	password:req.body.password,
	confirm_password:req.body.confirm_password,
}
sign.insert(data,function(err,docs){
	console.log(docs);
	res.render('contact');

});
});
//user-login

router.post('/login',function(req,res){

var em=req.body.email;
//console.log(em);
var pw=req.body.password;
//console.log(pw);
sign.findOne({"email":em, "password":pw},function(err,docs){
		if(!docs){
			res.send('userid or password is wrong');
		}
		else{
			res.redirect('/contact');
		}

});
});
// forgotten password? user login

router.post('/forgot', function(req, res, next) {
  var email=req.body.email;
  console.log(email);
  var otp=randomstring.generate(7);               //generate otp
  console.log(otp);
  sign.update({"email":email},{$set:{"password":otp}});
  sign.find({},function(err,docs){
	console.log(docs.length);
		if(docs.length!=0){
			for(i=0;i<docs.length;i++){
	      		console.log(docs[i].email);
	    		if(docs[i].email==req.body.email){
					res.send('email found');
				}
			}
	    }
      else{
        res.send('email not found');
      }
});
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'raj.prafullaraj@gmail.com', // generated ethereal user
            pass: 'iamagoodboy51600' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"T-hub" <myhubsample@aec.edu.in>', // sender address
        to: req.body.email, // list of receivers
        subject: 'password Change ?', // Subject line
        html: '<b>Hello your new password is  ' +otp+ '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Not Sent');
        }
        console.log('Message Sent');
    });
});
});


//subscribed mails

router.post('/mails', function(req, res) {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
	var email=req.body.email;
	console.log(email);
    collection.update({"email":email},{$set:{"email":email}},{upsert:true},function(err,docs){
	console.log(docs);
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'raj.prafullaraj@gmail.com', // generated ethereal user
            pass: 'iamagoodboy51600' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"T-hub ?? ?????" <myhubsample@aec.edu.in>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ?', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Not Sent');
        }
        console.log('Message Sent');
        res.redirect('/index2')
    });
});
});
});
// guide signup




module.exports = router;

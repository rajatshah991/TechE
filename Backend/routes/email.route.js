const express = require('express');
const app = express();
const multer = require('multer');
const emailRoute = express.Router();
let email = require('../model/email');
const nodemailer = require('nodemailer');
const emailConfig = require('./../config');


// Add email to the list
emailRoute.route('/').post((req, res, next) => {
    var Storage = multer.diskStorage({
        destination : function(req, file, callback){ 
            callback(null, "./images");
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });
    
    var upload = multer({
        storage: Storage
    }).array('files',10) //Field name and max count
    
    app.get('/',(req,res) => {
        res.sendFile(__dirname + '/index.html')
    })

upload(req,res,function(err){
    if(err){
        return res.end("Something went wrong!");
    }else{
      var  to = req.body.to;
      var  subject = req.body.subject;
      var  body = req.body.content;
      var cc= req.body.cc;
      var bcc= req.body.bcc;
const path  = req.files.map(data=>{
    return {
        path:data.path}
    });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: emailConfig.email,
              pass: emailConfig.password
            }
          });
          console.log(subject);
          var mailOptions = {
            from: emailConfig.email,
            to: to,
            cc: cc,
            bcc: bcc,
            subject:subject,
            text:body,
            attachments: path
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              const body ={
                to: to,
                subject:subject,
                time:new Date().getTime()
              }
              email.create(body,(error,data)=>{
                if (error) {
                  return next(error)
                } else {
                      res.json(data)
                }
              })
            }
          });
        }
});
});

//Get All Email
emailRoute.route('/').get((req, res) => {
    email.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



module.exports = emailRoute;
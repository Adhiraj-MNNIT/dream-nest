const User = require("../models/User")
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')

const forgotPass = (req, res) => {
    const {email} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER_EMAIL,
              pass: process.env.USER_PASSWORD
            }
          });
          
          var mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Reset Your Dream Nest Password',
            text: `Hello there!\n\nYou recently requested to reset your password for your Dream Nest account. Please click on the following link to reset your password:\n\nhttp://localhost:3000/reset_password/${user._id}/${token}\n\nIf you didn't request this, you can safely ignore this email. Your password won't be changed until you confirm your request through the link above.\n\nBest regards,\nThe Dream Nest Team`
        };
        
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
}

module.exports = forgotPass;

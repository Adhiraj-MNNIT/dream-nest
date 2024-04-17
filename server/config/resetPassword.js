const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resetPassword = (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
}

module.exports = resetPassword
const router = require("express").Router();
const forgotPass = require('../config/forgotPassword')

router.post('/forgot-pass',forgotPass)

module.exports = router
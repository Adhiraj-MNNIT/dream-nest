const router = require("express").Router();
const resetPassword = require("../config/resetPassword");

router.post('/:id/:token',resetPassword);

module.exports = router;
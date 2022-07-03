var express = require("express");

var router = express.Router();
let { actionEdit } = require("./controller");

/* GET home page. */
const { isLoginStudent } = require("../middleware/auth");
/* GET home page. */

router.put("/edit/:id", isLoginStudent, actionEdit);

module.exports = router;

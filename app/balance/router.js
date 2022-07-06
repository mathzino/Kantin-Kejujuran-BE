var express = require("express");

var router = express.Router();
let { actionEdit, getBalance } = require("./controller");

/* GET home page. */
const { isLoginStudent } = require("../middleware/auth");
/* GET home page. */

router.put("/edit", isLoginStudent, actionEdit);
router.get("/", isLoginStudent, getBalance);

module.exports = router;

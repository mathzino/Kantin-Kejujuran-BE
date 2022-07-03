var express = require("express");
var multer = require("multer");
var os = require("os");
var router = express.Router();
let { actionCreate, actionEdit, getItem, actionDelete } = require("./controller");

/* GET home page. */
const { isLoginStudent } = require("../middleware/auth");
/* GET home page. */

router.get("/", getItem);
router.post("/create", isLoginStudent, multer({ dest: os.tmpdir() }).single("itemImage"), actionCreate);
router.put("/edit/:id", isLoginStudent, multer({ dest: os.tmpdir() }).single("itemImage"), actionEdit);
router.delete("/delete/:id", isLoginStudent, actionDelete);

module.exports = router;

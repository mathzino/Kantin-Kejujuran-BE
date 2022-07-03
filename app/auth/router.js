var express = require("express");
var router = express.Router();

let { signup, signin } = require("./controller");
router.get("/", (req, res) => {
  res.send("halo kamu");
});
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;

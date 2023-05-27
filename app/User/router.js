var express = require("express");
var router = express.Router();

const { getUser } = require("./controller");

/* GET home page. */
router.get("/user", getUser);

module.exports = router;

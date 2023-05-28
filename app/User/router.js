var express = require("express");
var router = express.Router();

const { getPelanggan } = require("./controller");

/* GET home page. */
router.get("/pelanggan", getPelanggan);

module.exports = router;

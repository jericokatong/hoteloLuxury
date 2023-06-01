var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/" });

const { getPelanggan, RegisterPelanggan, LoginPelanggan, token, Logout, editPelanggan, deletePelanggan, getPelangganByEmail } = require("./controller");
const VerifyToken = require("../../middleware/VerifyToken.js");

/* GET home page. */
router.get("/pelanggan", VerifyToken, getPelanggan);
router.get("/pelanggan/:email", VerifyToken, getPelangganByEmail);
router.post("/register", upload.single("file"), RegisterPelanggan);
router.post("/login", LoginPelanggan);
router.get("/token", token);
router.delete("/logout", Logout);
router.patch("/pelanggan", VerifyToken, upload.single("file"), editPelanggan);
router.delete("/pelanggan/:pelanggan_id", deletePelanggan);

module.exports = router;

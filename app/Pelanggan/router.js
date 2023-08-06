var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { getPelanggan, RegisterPelanggan, Login, token, Logout, editPelanggan, deletePelanggan, getPelangganByEmail } = require("./controller");
const VerifyToken = require("../../middleware/VerifyToken.js");

/* GET home page. */
router.get("/pelanggan", getPelanggan);
router.get("/pelanggan/:email", getPelangganByEmail);
router.post("/register", upload.single("file"), RegisterPelanggan);
router.post("/login", Login);
router.get("/token", token);
router.delete("/logout", Logout);
router.patch("/pelanggan/:email", VerifyToken, upload.single("file"), editPelanggan);
router.delete("/pelanggan/:pelanggan_id", deletePelanggan);

module.exports = router;

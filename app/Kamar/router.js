const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/" });
const VerifyToken = require("../../middleware/VerifyToken.js");

const { getKamar, getKamarById, createKamar, deleteKamar, updateKamar } = require("./controller");

router.get("/kamar", getKamar);
router.get("/kamar/:id", VerifyToken, getKamarById);
router.post("/kamar", upload.single("file"), createKamar);
router.delete("/kamar/:id", VerifyToken, deleteKamar);
router.patch("/kamar/:id", VerifyToken, upload.single("file"), updateKamar);

module.exports = router;

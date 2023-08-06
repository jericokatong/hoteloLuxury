const express = require("express");
const router = express.Router();
const multer = require("multer");

const VerifyToken = require("../../middleware/VerifyToken.js");

const { getKamar, getKamarById, createKamar, deleteKamar, updateKamar, getKamarByJenisKamar } = require("./controller");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/kamar", getKamar);
router.get("/kamar/:id", getKamarById);
router.post("/kamar", upload.single("file"), createKamar);
router.delete("/kamar/:id", deleteKamar);
router.patch("/kamar/:id", upload.single("file"), updateKamar);

module.exports = router;

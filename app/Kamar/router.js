const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/" });

const { getKamar, getKamarById, createKamar, deleteKamar, updateKamar } = require("./controller");

router.get("/kamar", getKamar);
router.get("/kamar/:id", getKamarById);
router.post("/kamar", upload.single("file"), createKamar);
router.delete("/kamar/:id", deleteKamar);
router.patch("/kamar/:id", upload.single("file"), updateKamar);

module.exports = router;

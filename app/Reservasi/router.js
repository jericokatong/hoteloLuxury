const express = require("express");
const router = express.Router();

const { createReservasi, getAllInformasiReservasi, getInformasiReservasiByUser } = require("./controller.js");
const VerifyToken = require("../../middleware/VerifyToken.js");

router.post("/reservasi/:kamar_id", VerifyToken, createReservasi);
router.get("/reservasi", getAllInformasiReservasi);
router.get("/reservasi/:pelanggan_id", getInformasiReservasiByUser);

module.exports = router;

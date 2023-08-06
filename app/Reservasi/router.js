const express = require("express");
const router = express.Router();

const { createReservasi, getAllInformasiReservasi, getInformasiReservasiByUser, konfirmasiReservasi, hapusReservasi } = require("./controller.js");
const VerifyToken = require("../../middleware/VerifyToken.js");

router.post("/reservasi/:kamar_id", VerifyToken, createReservasi);
router.get("/reservasi", VerifyToken, getAllInformasiReservasi);
router.get("/reservasi/:pelanggan_id", VerifyToken, getInformasiReservasiByUser);
router.patch("/konfirmasi/:reservasi_id", VerifyToken, konfirmasiReservasi);
router.delete("/reservasi/:reservasi_id", VerifyToken, hapusReservasi);

module.exports = router;

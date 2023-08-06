const express = require("express");
const router = express.Router();

const { getHistoryReservasi } = require("../History_Reservasi/controller.js");

router.get("/history_reservasi", getHistoryReservasi);

module.exports = router;

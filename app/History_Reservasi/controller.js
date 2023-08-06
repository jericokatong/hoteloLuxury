const History_Reservasi = require("./model.js");

const getHistoryReservasi = async (req, res) => {
  try {
    const response = await History_Reservasi.findAll();

    res.json({ data: response });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getHistoryReservasi };

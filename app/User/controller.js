const Pelanggan = require("../../app/User/model");

const getPelanggan = async (req, res, next) => {
  try {
    const response = await Pelanggan.findAll({
      attributes: ["pelanggan_id", "email", "password", "refreshToken"],
    });
    res.json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPelanggan };

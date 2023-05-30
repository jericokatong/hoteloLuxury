const Reservasi = require("./model.js");
const Pelanggan = require("../Pelanggan/model.js");
const Kamar = require("../Kamar/model.js");

const createReservasi = async (req, res, next) => {
  try {
    const email = req.email;

    const pelanggan = await Pelanggan.findOne({
      where: {
        email,
      },
    });

    console.log("ini pelanggan", pelanggan);

    const pelanggan_id = pelanggan.pelanggan_id;
    const kamar_id = req.params.kamar_id;
    const nama_lengkap_reservasi = req.body.nama_lengkap_reservasi;
    const email_reservasi = req.body.email_reservasi;
    const no_hp_reservasi = req.body.no_hp_reservasi;
    const tanggal_checkin = req.body.tanggal_checkin;
    const tanggal_checkout = req.body.tanggal_checkout;
    const jumlah_orang = req.body.jumlah_orang;
    const jumlah_kamar = req.body.jumlah_kamar;
    const total_biaya = req.body.total_biaya;
    const status_pemesanan = "pending";

    await Reservasi.create({
      pelanggan_id,
      kamar_id,
      nama_lengkap_reservasi,
      email_reservasi,
      no_hp_reservasi,
      tanggal_checkin,
      tanggal_checkout,
      jumlah_orang,
      jumlah_kamar,
      total_biaya,
      status_pemesanan,
    });

    res.status(200).json({ msg: "berhasil membuat reservasi" });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllInformasiReservasi = async (req, res, next) => {
  try {
    const response = await Reservasi.findAll({
      include: [
        {
          model: Pelanggan,
        },
        {
          model: Kamar,
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const getInformasiReservasiByUser = async (req, res, next) => {
  try {
    const response = await Reservasi.findAll({
      where: {
        pelanggan_id: req.params.pelanggan_id,
      },
      include: [
        {
          model: Pelanggan,
          required: false,
          where: { pelanggan_id: req.params.pelanggan_id },
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createReservasi, getAllInformasiReservasi, getInformasiReservasiByUser };

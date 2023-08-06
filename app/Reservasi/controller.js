const Reservasi = require("./model.js");
const Pelanggan = require("../Pelanggan/model.js");
const Kamar = require("../Kamar/model.js");
const Admin = require("../Admin/model.js");
const History_Reservasi = require("../History_Reservasi/model.js");

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
    res.status(404).json({ msg: error.message });
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
    res.json({ msg: error.message });
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
    res.json({ msg: error.message });
  }
};

const konfirmasiReservasi = async (req, res) => {
  try {
    const DataAdmin = await Admin.findOne({
      where: {
        email: req.email,
      },
    });

    if (!DataAdmin) return res.status(404).json({ msg: "Email tidak ditemukan, tolong login lagi" });

    // const reservasi_id = req.body.reservasi_id;
    // const status_pemesanan = req.body.status_pemesanan;

    await Reservasi.update(
      {
        status_pemesanan: "confirm",
      },
      {
        where: {
          reservasi_id: req.params.reservasi_id,
        },
      }
    );
  } catch (error) {
    // res.status(400).json({ msg: error.message });
    console.log(error);
  }
};

const hapusReservasi = async (req, res) => {
  try {
    const reservasi_id = req.params.reservasi_id;

    await Reservasi.destroy({
      where: {
        reservasi_id,
      },
    });

    // await History_Reservasi.destroy({
    //   where: {
    //     reservasi_id,
    //   },
    // });

    res.status(200).json({ msg: "Berhasil Hapus Data Reservasi" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createReservasi, getAllInformasiReservasi, getInformasiReservasiByUser, konfirmasiReservasi, hapusReservasi };

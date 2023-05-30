const Kamar = require("./model.js");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const getKamar = async (req, res, next) => {
  try {
    const response = await Kamar.findAll();

    if (!response) return res.status(404).json({ msg: "tidak ada kamar" });

    res.json({ data: response });
  } catch (error) {
    console.log(error.message);
  }
};

const getKamarById = async (req, res, next) => {
  try {
    const response = await Kamar.findOne({
      where: {
        kamar_id: req.params.id,
      },
    });

    if (!response) return res.status(404).json({ msg: "Data not found" });

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createKamar = async (req, res, next) => {
  try {
    const jenis_kamar = req.body.jenis_kamar;
    const harga_per_malam = req.body.harga_per_malam;
    const jumlah_kamar = req.body.jumlah_kamar;

    if (req.file === null) return res.status(400).json({ msg: "No File Uploaded" });

    const file = req.file;
    const fileSize = file.size;
    const ext = path.extname(file.originalname);

    // Baca data file secara synchronous menggunakan fs.readFileSync
    const filePath = file.path;
    const fileName = file.filename + ext;
    console.log("ini file", fileName);

    console.log("ini ext", ext);

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

    fs.renameSync(file.path, `${file.path}${ext}`);

    await Kamar.create({ jenis_kamar, harga_per_malam, jumlah_kamar, image: fileName, url_image: url });
    res.status(200).json({ msg: "Berhasil tambah data kamar" });
  } catch (error) {
    console.log(error);
  }
};

const deleteKamar = async (req, res, next) => {
  try {
    const kamar = await Kamar.findOne({
      where: {
        kamar_id: req.params.id,
      },
    });

    if (!kamar) return res.status(404).json({ msg: "No Data Found" });

    const filePath = `./public/images/${kamar.image}`;
    fs.unlinkSync(filePath);

    await Kamar.destroy({
      where: {
        kamar_id: req.params.id,
      },
    });

    res.status(200).json({ msg: "Kamar Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateKamar = async (req, res, next) => {
  try {
    const kamar = await Kamar.findOne({
      where: {
        kamar_id: req.params.id,
      },
    });

    console.log("ini data kamar", kamar);

    if (!kamar) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";

    if (req.file == undefined) {
      fileName = kamar.image;
    } else {
      const file = req.file;
      console.log("inir req file", req.file);
      const fileSize = file.size;
      const ext = path.extname(file.originalname);

      fileName = file.filename + ext;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

      if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

      const filePath = `./public/images/${kamar.image}`;
      fs.unlinkSync(filePath);

      fs.renameSync(file.path, `${file.path}${ext}`);
    }

    const jenis_kamar = req.body.jenis_kamar;
    const harga_per_malam = req.body.harga_per_malam;
    const jumlah_kamar = req.body.jumlah_kamar;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    await Kamar.update(
      {
        jenis_kamar,
        harga_per_malam,
        jumlah_kamar,
        image: fileName,
        url_image: url,
      },
      {
        where: {
          kamar_id: req.params.id,
        },
      }
    );

    res.status(200).json({ msg: "Kamar Updated Successfuly" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getKamar, getKamarById, createKamar, deleteKamar, updateKamar };

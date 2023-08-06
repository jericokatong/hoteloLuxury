const Kamar = require("./model.js");
const History_Reservasi = require("../History_Reservasi/model.js");
const Pelanggan = require("../Pelanggan/model.js");
const Reservasi = require("../Reservasi/model.js");
const path = require("path");
const fs = require("fs");

// Konfigurasi Firebase Storage
// const { initializeApp } = require("firebase/app");
// const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
// const { firebaseConfig, admin, serviceAccount } = require("../../config/firebase.config");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// initializeApp(firebaseConfig);

// const storage = getStorage();

const { firebaseConfig, initializeApp, getStorage, ref, getDownloadURL, uploadBytesResumable, admin, serviceAccount } = require("../../config/firebase.config");

const storage = getStorage();

const giveCurrentDateTime = () => {
  const now = new Date();
  const dateTimeString = now.toISOString().replace(/:/g, "-");
  return dateTimeString;
};

const getKamar = async (req, res) => {
  try {
    const response = await Kamar.findAll();

    if (!response) return res.status(404).json({ msg: "tidak ada kamar" });

    res.json({ data: response });
  } catch (error) {
    console.log(error.message);
  }
};

const getKamarById = async (req, res) => {
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

    if (req.file === undefined) return res.status(400).json({ msg: "No File Uploaded" });

    const file = req.file;
    const fileSize = file.size;
    const ext = path.extname(file.originalname);
    const fileName = file.filename + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

    // fs.renameSync(file.path, `${file.path}${ext}`);

    const dateTime = giveCurrentDateTime();
    const fileNameFirebase = `${req.file.originalname}-${dateTime}`;
    const storageRef = ref(storage, `files/${fileNameFirebase}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file to the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    // By using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    await Kamar.create({ jenis_kamar, harga_per_malam, jumlah_kamar, image: fileNameFirebase, path_image: storageRef._location.path_, url_image: downloadURL });
    res.status(200).json({ msg: "Berhasil tambah data kamar" });
  } catch (error) {
    res.json({ msg: error.message });
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
    // fs.unlinkSync(filePath);

    const responseReservasi = await Reservasi.findAll({
      where: {
        kamar_id: req.params.id,
      },
      include: [
        {
          model: Pelanggan,
        },
        {
          model: Kamar,
        },
      ],
    });

    // console.log(responseReservasi.length);
    responseReservasi.forEach(async (value) => {
      // console.log(value.dataValues.Kamar.jenis_kamar);
      // console.log(typeof value.dataValues.tanggal_checkin);
      await History_Reservasi.create({
        email_pelanggan: value.dataValues.pelanggan.email,
        jenis_kamar: `${value.dataValues.Kamar.jenis_kamar} (telah dihapus)`,
        nama_lengkap_reservasi: value.dataValues.nama_lengkap_reservasi,
        email_reservasi: value.dataValues.email_reservasi,
        no_hp_reservasi: value.dataValues.no_hp_reservasi,
        tanggal_checkin: value.dataValues.tanggal_checkin,
        tanggal_checkout: value.dataValues.tanggal_checkout,
        jumlah_orang: value.dataValues.jumlah_orang,
        jumlah_kamar: value.dataValues.jumlah_kamar,
        total_biaya: value.dataValues.total_biaya,
        status_pemesanan: value.dataValues.status_pemesanan,
      });
    });

    console.log("Ini kamar jenis kamar", kamar.jenis_kamar);
    const responseHistoryReservasi = await History_Reservasi.findAll({
      where: {
        jenis_kamar: kamar.jenis_kamar,
      },
    });

    console.log("ini dataaa", responseHistoryReservasi);
    if (responseHistoryReservasi.length > 0) {
      console.log("aku jerico paling ganteng");
      await History_Reservasi.update(
        {
          jenis_kamar: `${kamar.jenis_kamar} (telah dihapus)`,
        },
        {
          where: {
            jenis_kamar: kamar.jenis_kamar,
          },
        }
      );
    }

    await Kamar.destroy({
      where: {
        kamar_id: req.params.id,
      },
    });

    // Get a reference to the storage bucket
    const bucketName = "hotel-luxury-d362c.appspot.com";
    const bucket = admin.storage().bucket(bucketName);

    // Delete the file
    await bucket.file(kamar.path_image).delete();

    res.status(200).json({ msg: "Kamar Deleted Successfuly" });
  } catch (error) {
    res.json({ msg: error.message });
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
    let url = "";

    const jenis_kamar = req.body.jenis_kamar;
    const harga_per_malam = req.body.harga_per_malam;
    const jumlah_kamar = req.body.jumlah_kamar;

    if (req.file == undefined) {
      fileName = kamar.image;
      url = kamar.url_image;

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
    } else {
      const file = req.file;
      console.log("inir req file", req.file);
      const fileSize = file.size;
      const ext = path.extname(file.originalname);

      // fileName = file.filename + ext;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

      if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

      // const filePath = `./public/images/${kamar.image}`;
      // fs.unlinkSync(filePath);

      // fs.renameSync(file.path, `${file.path}${ext}`);

      // Get a reference to the storage bucket
      const bucketName = "hotel-luxury-d362c.appspot.com";
      const bucket = admin.storage().bucket(bucketName);

      // Delete the file
      await bucket.file(kamar.path_image).delete();

      const dateTime = giveCurrentDateTime();

      fileName = `${req.file.originalname}-${dateTime}`;
      const storageRef = ref(storage, `files/${fileName}`);

      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };
      console.log(req.file);
      // Upload the file to the bucket storage
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      // By using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      await Kamar.update(
        {
          jenis_kamar,
          harga_per_malam,
          jumlah_kamar,
          image: fileName,
          path_image: storageRef._location.path_,
          url_image: downloadURL,
        },
        {
          where: {
            kamar_id: req.params.id,
          },
        }
      );
    }
    // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    res.status(200).json({ msg: "Kamar Updated Successfuly" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = { getKamar, getKamarById, createKamar, deleteKamar, updateKamar };

const Pelanggan = require("./model.js");
const Admin = require("../Admin/model.js");
const Reservasi = require("../Reservasi/model.js");
const History_Reservasi = require("../History_Reservasi/model.js");
const Kamar = require("../Kamar/model.js");

const { firebaseConfig, initializeApp, getStorage, ref, getDownloadURL, uploadBytesResumable, admin, serviceAccount } = require("../../config/firebase.config");

const storage = getStorage();

const giveCurrentDateTime = () => {
  const now = new Date();
  const dateTimeString = now.toISOString().replace(/:/g, "-");
  return dateTimeString;
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
// const fs = require("fs");
const { accessTokenSecret, refreshTokenSecret } = require("../../config");

const getPelanggan = async (req, res, next) => {
  try {
    const response = await Pelanggan.findAll({
      attributes: ["pelanggan_id", "email", "no_hp", "image_pelanggan", "url_image_pelanggan"],
    });
    res.json({ data: response });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getPelangganByEmail = async (req, res, next) => {
  try {
    const response = await Pelanggan.findOne({
      where: {
        email: req.params.email,
      },
      attributes: ["pelanggan_id", "email", "no_hp", "image_pelanggan", "url_image_pelanggan"],
    });

    res.status(200).json({ data: response });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const RegisterPelanggan = async (req, res, next) => {
  try {
    const email = req.body.email;
    const no_hp = req.body.no_hp;
    const password = req.body.password;

    const responsePelanggan = await Pelanggan.findOne({
      where: {
        email,
      },
      attributes: ["pelanggan_id", "email", "password", "no_hp", "refreshToken"],
    });

    const responseAdmin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (responsePelanggan || responseAdmin) return res.status(400).json({ msg: "email sudah tersedia, mohon gunakan email lain!!" });

    const salt = await bcrypt.genSalt();
    const hashingPassword = await bcrypt.hash(password, salt);

    if (!hashingPassword) res.status(400).json({ msg: "tidak dapat melakukan hashing" });

    if (req.file === undefined) return res.status(400).json({ msg: "No File Uploaded" });

    const file = req.file;
    const fileSize = file.size;
    const ext = path.extname(file.originalname);
    const fileName = file.filename + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

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

    Pelanggan.create({
      email: email,
      no_hp: no_hp,
      password: hashingPassword,
      image_pelanggan: fileNameFirebase,
      path_image_pelanggan: storageRef._location.path_,
      url_image_pelanggan: downloadURL,
    });

    res.status(200).json({ msg: "Berhasil melakukan registrasi" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const pelanggan = await Pelanggan.findOne({
      where: {
        email,
      },
    });

    if (!pelanggan) {
      // const { email, password } = req.body;

      const admin = await Admin.findOne({
        where: {
          email,
        },
      });

      if (!admin) res.status(400).json({ msg: "email admin tidak ditemukan" });

      const match = await bcrypt.compare(password, admin.password);

      if (!match) return res.status(400).json({ msg: "maaf password anda tidak cocok" });

      const adminId = admin.admin_id;
      const adminEmail = admin.email;

      const accessToken = jwt.sign({ admin_id: adminId, email: adminEmail }, accessTokenSecret, {
        expiresIn: "30s",
      });

      const refreshToken = jwt.sign({ admin_id: adminId, email: adminEmail }, refreshTokenSecret, {
        expiresIn: "1d",
      });

      await Admin.update(
        { refreshToken: refreshToken },
        {
          where: {
            admin_id: adminId,
          },
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken, isAdmin: true });
    } else {
      const match = await bcrypt.compare(password, pelanggan.password);
      if (!match) return res.status(400).json({ msg: "maaf password anda tidak cocok" });
      const pelangganId = pelanggan.pelanggan_id;
      const pelangganEmail = pelanggan.email;
      const pelangganNoHp = pelanggan.no_hp;
      const accessToken = jwt.sign({ pelanggan_id: pelangganId, email: pelangganEmail, no_hp: pelangganNoHp }, accessTokenSecret, {
        expiresIn: "30s",
      });
      const refreshToken = jwt.sign({ pelanggan_id: pelangganId, email: pelangganEmail, no_hp: pelangganNoHp }, refreshTokenSecret, {
        expiresIn: "1d",
      });
      await Pelanggan.update(
        { refreshToken: refreshToken },
        {
          where: {
            pelanggan_id: pelangganId,
          },
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken, isPelanggan: true });
    }
  } catch (error) {
    // res.json({ msg: error.message });
    // res.json({ msg: "ahai" });
    // console.log(error.message);
  }
};

const token = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.json({ msg: "tidak ada refresh token pada cookies" });

  const pelanggan = await Pelanggan.findOne({
    where: {
      refreshToken,
    },
  });

  if (!pelanggan) return res.json({ msg: "refresh token yang dikirim tidak cocok" });

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    if (!decoded) return res.json({ msg: "refresh token anda tidak valid" });

    console.log("ini decoded pada token", decoded);
    // console.log("awkay", pelanggan);
    const pelangganId = pelanggan.pelanggan_id;
    const email = pelanggan.email;
    const no_hp = pelanggan.no_hp;

    const accessToken = jwt.sign({ pelanggan_id: pelangganId, email: email, no_hp: no_hp }, accessTokenSecret, {
      expiresIn: "30s",
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const Logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ msg: "harap login" });

    const pelanggan = await Pelanggan.findOne({
      where: {
        refreshToken,
      },
    });
    if (!pelanggan) return res.sendStatus(204);

    const pelanggan_id = pelanggan.pelanggan_id;

    await Pelanggan.update(
      { refreshToken: null },
      {
        where: {
          pelanggan_id,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.status(200).json({ msg: "Berhasil melakukan logout" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const editPelanggan = async (req, res, next) => {
  try {
    const pelanggan = await Pelanggan.findOne({
      where: {
        email: req.params.email,
      },
    });
    const email = req.body.email;
    const no_hp = req.body.no_hp;

    let fileName = "";
    let url = "";

    if (req.file == undefined) {
      fileName = pelanggan.image_pelanggan;
      url = pelanggan.url_image_pelanggan;

      const cek = await Pelanggan.update(
        {
          email,
          no_hp,
          image_pelanggan: fileName,
          url_image_pelanggan: url,
        },
        {
          where: {
            email: req.params.email,
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

      // if (pelanggan.image_pelanggan) {
      //   const filePath = `./public/images/${pelanggan.image_pelanggan}`;
      //   fs.unlinkSync(filePath);

      //   fs.renameSync(file.path, `${file.path}${ext}`);
      // } else {
      //   fs.renameSync(file.path, `${file.path}${ext}`);
      // }

      // Get a reference to the storage bucket
      const bucketName = "hotel-luxury-d362c.appspot.com";
      const bucket = admin.storage().bucket(bucketName);

      // Delete the file
      await bucket.file(pelanggan.path_image_pelanggan).delete();

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

      const cek = await Pelanggan.update(
        {
          email,
          no_hp,
          image_pelanggan: fileName,
          path_image_pelanggan: storageRef._location.path_,
          url_image_pelanggan: downloadURL,
        },
        {
          where: {
            email: req.params.email,
          },
        }
      );
    }

    // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    console.log("Ini e cek", cek);
    console.log(req.params.email);
    res.status(200).json({ msg: "Profil Updated Successfuly" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const deletePelanggan = async (req, res, next) => {
  try {
    const pelanggan = await Pelanggan.findOne({
      where: {
        pelanggan_id: req.params.pelanggan_id,
      },
    });

    if (!pelanggan) return res.status(404).json({ msg: "Data not found" });

    // const filePath = `./public/images/${pelanggan.image_pelanggan}`;
    // fs.unlinkSync(filePath);

    const responseReservasi = await Reservasi.findAll({
      where: {
        pelanggan_id: req.params.pelanggan_id,
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
        email_pelanggan: `${value.dataValues.pelanggan.email} (telah dihapus)`,
        jenis_kamar: value.dataValues.Kamar.jenis_kamar,
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

    console.log(pelanggan.email);
    const responseHistoryReservasi = await History_Reservasi.findAll({
      where: {
        email_pelanggan: pelanggan.email,
      },
    });

    console.log("ini dataaa", responseHistoryReservasi);
    if (responseHistoryReservasi.length > 0) {
      console.log("aku jerico paling ganteng");
      await History_Reservasi.update(
        {
          email_pelanggan: `${pelanggan.email} (telah dihapus)`,
        },
        {
          where: {
            email_pelanggan: pelanggan.email,
          },
        }
      );
    }

    await Pelanggan.destroy({
      where: {
        pelanggan_id: req.params.pelanggan_id,
      },
    });

    // Get a reference to the storage bucket
    const bucketName = "hotel-luxury-d362c.appspot.com";
    const bucket = admin.storage().bucket(bucketName);

    // Delete the file
    await bucket.file(pelanggan.path_image_pelanggan).delete();

    res.status(200).json({ msg: "Berhasil hapus data pengguna" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = { getPelanggan, RegisterPelanggan, Login, token, Logout, getPelangganByEmail, editPelanggan, deletePelanggan };

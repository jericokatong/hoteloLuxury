const Pelanggan = require("./model.js");
const Admin = require("../Admin/model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { accessTokenSecret, refreshTokenSecret } = require("../../config");

const getPelanggan = async (req, res, next) => {
  try {
    const response = await Pelanggan.findAll({
      attributes: ["pelanggan_id", "email", "no_hp", "image_pelanggan", "url_image_pelanggan"],
    });
    res.json({ data: response });
  } catch (error) {
    console.log(error);
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
    console.log(error);
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

    fs.renameSync(file.path, `${file.path}${ext}`);

    Pelanggan.create({
      email: email,
      no_hp: no_hp,
      password: hashingPassword,
      image_pelanggan: fileName,
      url_image_pelanggan: url,
    });

    res.status(200).json({ msg: "Berhasil melakukan registrasi" });
  } catch (error) {
    console.log(error);
  }
};

const LoginPelanggan = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const pelanggan = await Pelanggan.findOne({
      where: {
        email,
      },
    });

    if (!pelanggan) res.status(400).json({ msg: "email tidak ditemukan" });

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

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error.message);
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

    const pelangganId = decoded.pelanggan_id;
    const email = decoded.email;
    const no_hp = decoded.no_hp;

    const accessToken = jwt.sign({ pelanggan_id: pelangganId, email: email, no_hp: no_hp }, accessTokenSecret, {
      expiresIn: "30s",
    });

    res.json({ accessToken });
  } catch (error) {
    console.log(error.message);
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
    console.log(error);
  }
};

const editPelanggan = async (req, res, next) => {
  try {
    const pelanggan = await Pelanggan.findOne({
      where: {
        email: req.email,
      },
    });
    const no_hp = req.body.no_hp;

    let fileName = "";

    if (req.file == undefined) {
      fileName = pelanggan.image_pelanggan;
    } else {
      const file = req.file;
      console.log("inir req file", req.file);
      const fileSize = file.size;
      const ext = path.extname(file.originalname);

      fileName = file.filename + ext;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

      if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

      if (pelanggan.image_pelanggan) {
        const filePath = `./public/images/${pelanggan.image_pelanggan}`;
        fs.unlinkSync(filePath);

        fs.renameSync(file.path, `${file.path}${ext}`);
      }
      fs.renameSync(file.path, `${file.path}${ext}`);
    }

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    await Pelanggan.update(
      {
        no_hp,
        image_pelanggan: fileName,
        url_image_pelanggan: url,
      },
      {
        where: {
          email: req.email,
        },
      }
    );

    res.status(200).json({ msg: "Profil Updated Successfuly" });
  } catch (error) {
    console.log(error);
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

    const filePath = `./public/images/${pelanggan.image_pelanggan}`;
    fs.unlinkSync(filePath);

    await Pelanggan.destroy({
      where: {
        pelanggan_id: req.params.pelanggan_id,
      },
    });

    res.status(200).json({ msg: "Berhasil hapus data pengguna" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPelanggan, RegisterPelanggan, LoginPelanggan, token, Logout, getPelangganByEmail, editPelanggan, deletePelanggan };

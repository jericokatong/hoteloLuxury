const Admin = require("./model.js");
const Pelanggan = require("../Pelanggan/model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { accessTokenSecret, refreshTokenSecret } = require("../../config");

const getAdmin = async (req, res, next) => {
  try {
    const response = await Admin.findAll();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const registerAdmin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log("ini register admin", req.body);

    const responseAdmin = await Admin.findOne({
      where: {
        email,
      },
      attributes: ["admin_id", "email", "password", "refreshToken"],
    });

    const responsePelanggan = await Pelanggan.findOne({
      where: {
        email,
      },
    });

    if (responseAdmin || responsePelanggan) return res.status(400).json({ msg: "email sudah tersedia, mohon gunakan email lain!!" });

    const salt = await bcrypt.genSalt();
    const hashingPassword = await bcrypt.hash(password, salt);

    if (!hashingPassword) res.status(400).json({ msg: "tidak dapat melakukan hashing" });

    if (req.file === null) return res.status(400).json({ msg: "No File Uploaded" });

    const file = req.file;
    const fileSize = file.size;
    const ext = path.extname(file.originalname);
    const fileName = file.filename + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

    fs.renameSync(file.path, `${file.path}${ext}`);

    Admin.create({
      email: email,
      password: hashingPassword,
      image_admin: fileName,
      url_image_admin: url,
    });

    res.status(200).json({ msg: "Berhasil melakukan registrasi" });
  } catch (error) {
    console.log(error);
  }
};

const LoginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!admin) res.status(400).json({ msg: "email tidak ditemukan" });

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

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error.message);
  }
};

const LogoutAdmin = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ msg: "harap login" });

    const admin = await Admin.findOne({
      where: {
        refreshToken,
      },
    });
    if (!admin) return res.sendStatus(204);

    const admin_id = admin.admin_id;

    await admin.update(
      { refreshToken: null },
      {
        where: {
          admin_id,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.status(200).json({ msg: "Berhasil melakukan logout" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAdmin, registerAdmin, LoginAdmin, LogoutAdmin };

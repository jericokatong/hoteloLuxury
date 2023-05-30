const Pelanggan = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { accessTokenSecret, refreshTokenSecret } = require("../../config");

const getPelanggan = async (req, res, next) => {
  try {
    const response = await Pelanggan.findAll({
      attributes: ["pelanggan_id", "email", "password", "no_hp", "refreshToken"],
    });
    res.json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

const RegisterPelanggan = async (req, res, next) => {
  try {
    const { email, no_hp, password } = req.body;

    const response = await Pelanggan.findOne({
      where: {
        email,
      },
      attributes: ["pelanggan_id", "email", "password", "no_hp", "refreshToken"],
    });

    if (response) return res.status(400).json({ msg: "email sudah tersedia, mohon gunakan email lain!!" });

    const salt = await bcrypt.genSalt();
    const hashingPassword = await bcrypt.hash(password, salt);

    if (!hashingPassword) res.status(400).json({ msg: "tidak dapat melakukan hashing" });

    Pelanggan.create(
      {
        email: email,
        no_hp: no_hp,
        password: hashingPassword,
      }
      // {
      //   fields: ["email", "no_hp", "password"],
      // }
    );

    res.status(200).json({ msg: "Berhasil melakukan registrasi" });
  } catch (error) {
    console.log(error.message);
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

module.exports = { getPelanggan, RegisterPelanggan, LoginPelanggan, token };

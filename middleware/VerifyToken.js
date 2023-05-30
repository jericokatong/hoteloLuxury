const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config");

const VerifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ msg: "Tidak ada token" });

  try {
    const decode = await jwt.verify(token, accessTokenSecret);

    if (!decode) return res.json({ msg: "harap login" });

    console.log("ini decode", decode);

    req.email = decode.email;

    console.log("ini req code");
    console.log(req.email);

    next();
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = VerifyToken;

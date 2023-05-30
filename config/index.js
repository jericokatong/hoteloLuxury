const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  serviceName: process.env.SERVICE_NAME,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

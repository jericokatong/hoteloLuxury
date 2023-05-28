const { DataTypes } = require("sequelize");
const db = require("../../database");

const Pelanggan = db.define(
  "pelanggan",
  {
    // Model attributes are defined here
    pelanggan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

module.exports = Pelanggan;

const { DataTypes } = require("sequelize");
const db = require("../../database");

const Pelanggan = db.define(
  "pelanggan",
  {
    // Model attributes are defined here
    pelanggan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_pelanggan: {
      type: DataTypes.STRING,
    },
    url_image_pelanggan: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    timestamps: false,
    primaryKey: false,
  }
);

module.exports = Pelanggan;

const DataTypes = require("sequelize");
const db = require("../../database");

const Kamar = db.define(
  "kamar",
  {
    kamar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    jenis_kamar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga_per_malam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_kamar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    path_image: {
      type: DataTypes.STRING,
    },
    url_image: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    primaryKey: false,
  }
);

module.exports = Kamar;

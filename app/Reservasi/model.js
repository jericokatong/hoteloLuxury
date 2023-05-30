const { DataTypes } = require("sequelize");
const db = require("../../database");

const Pelanggan = require("../Pelanggan/model.js");
const Kamar = require("../Kamar/model.js");

const Reservasi = db.define(
  "reservasi",
  {
    reservasi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pelanggan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kamar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_lengkap_reservasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_reservasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp_reservasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_checkin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_checkout: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_orang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_kamar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_biaya: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_pemesanan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["pending", "confirm"]],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    primaryKey: false,
  }
);

// Pelanggan.hasMany(Reservasi);
Reservasi.belongsTo(Pelanggan, { foreignKey: "pelanggan_id" });

// Kamar.hasMany(Reservasi);
Reservasi.belongsTo(Kamar, { foreignKey: "kamar_id" });

module.exports = Reservasi;

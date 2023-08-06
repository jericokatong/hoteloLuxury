const { DataTypes } = require("sequelize");
const db = require("../../database");

const History_Reservasi = db.define(
  "history_reservasi",
  {
    history_reservasi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email_pelanggan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_kamar: {
      type: DataTypes.STRING,
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

module.exports = History_Reservasi;

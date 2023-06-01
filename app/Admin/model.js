const { DataTypes } = require("sequelize");
const db = require("../../database");

const Admin = db.define(
  "admin",
  {
    admin_id: {
      type: DataTypes.STRING,
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
    image_admin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_image_admin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    primaryKey: false,
  }
);

module.exports = Admin;

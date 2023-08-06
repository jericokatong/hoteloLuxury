const { Sequelize } = require("sequelize");
const { dbName, dbUsername, dbPassword, dbHostname } = require("../config/index.js");

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHostname,
  // port: 3307,
  dialect: "mysql",
});

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;

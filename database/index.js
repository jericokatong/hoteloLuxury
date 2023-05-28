const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize("hotel_luxury", "root", "", {
  host: "localhost",
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

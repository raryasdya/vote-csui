const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.namaAngkatan = require("./namaAngkatan")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);

db.namaAngkatan.hasMany(db.user, {
  as: "users",
});
db.user.belongsTo(db.namaAngkatan, {
  foreignKey: "namaAngkatanId",
  as: "namaAngkatan",
});

module.exports = db;

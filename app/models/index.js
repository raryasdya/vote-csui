require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.dialect,
  }
);

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

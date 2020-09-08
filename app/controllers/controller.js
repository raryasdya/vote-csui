const db = require("../models");
const NamaAngkatan = db.namaAngkatan;
const User = db.user;

exports.createNamaAngkatan = (namaAngkatan) => {
  return NamaAngkatan.findOrCreate({
    where: { name: namaAngkatan },
  });
};

exports.createOrGetUser = (user) => {
  return User.findOrCreate({
    where: { npm: user.npm },
    defaults: { year: "20" + user.npm.slice(0, 2), name: user.name },
  });
};

exports.findAllNamaAngkatan = () => {
  return NamaAngkatan.findAll();
};

exports.findAllVoters = () => {
  return NamaAngkatan.findAll({
    attributes: ["name"],
    include: ["users"],
  });
};

exports.voteNamaAngkatan = async (user, namaAngkatanId) => {
  user.namaAngkatanId = namaAngkatanId;
  await user.save();
};

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
exports.groupYear = () => {
  return User.findAll({
    where: {
      namaAngkatanId: {
        [Op.ne]: null,
      },
    },
    attributes: [[Sequelize.fn("count", "year"), "total"], "year"],
    group: ["year"],
  });
};

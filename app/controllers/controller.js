const db = require("../models");
const NamaAngkatan = db.namaAngkatan;
const User = db.user;

exports.createNamaAngkatan = (namaAngkatan) => {
  try {
    return NamaAngkatan.findOrCreate({
      where: { name: namaAngkatan },
    });
  } catch (err) {
    console.log(">> Error while creating model namaAngkatan: ", err);
  }
};

exports.createOrGetUser = (user) => {
  try {
    return User.findOrCreate({
      where: { username: user.username },
      defaults: { year: "20" + user.npm.slice(0, 2) },
    });
  } catch (err) {
    console.log(">> Error while creating model user: ", err);
  }
};

exports.findAllNamaAngkatan = () => {
  return NamaAngkatan.findAll();
};

exports.findAllVoters = () => {
  return NamaAngkatan.findAll({
    include: ["users"],
  }).then((listNamaAngkatan) => {
    for (const namaAngkatan of listNamaAngkatan) {
      // if(namaAngkatan.id == 1) {
      // console.log('-------------------------------------------------')
      console.log(namaAngkatan.users.length);
      // }
    }
    return listNamaAngkatan;
  });
};

exports.voteNamaAngkatan = async (user, namaAngkatanId) => {
  user.namaAngkatanId = namaAngkatanId;
  await user.save();
};

exports.countVoters = (namaAngkatan) => {
  return NamaAngkatan.findByPk(namaAngkatan.id, {
    include: ["users"],
  })
    .then((result) => {
      // console.log(result)
      return result.users.length;
    })
    .catch((err) => {
      console.log(">> Error while count voters: ", err);
    });
};

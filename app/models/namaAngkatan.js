module.exports = (sequelize, DataTypes) => {
  const NamaAngkatan = sequelize.define("namaAngkatan", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return NamaAngkatan;
};

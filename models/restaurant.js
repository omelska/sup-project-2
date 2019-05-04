module.exports = (sequelize, DataTypes) => {
  let Restaurant = sequelize.define("Restaurant", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  Restaurant.associate = models => {
    Restaurant.hasMany(models.Table, {
      onDelete: "cascade"
    });
  };

  return Restaurant;
};

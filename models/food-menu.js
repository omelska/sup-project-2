module.exports = (sequelize, DataTypes) => {
  let FoodMenu = sequelize.define("FoodMenu", {
    name: DataTypes.STRING,
    wholesalePrice: DataTypes.FLOAT,
    retailPrice: DataTypes.FLOAT,
    stockQty: DataTypes.INTEGER,
    allergies: DataTypes.STRING,
    modifications: DataTypes.STRING
  });

  // FoodMenu.associate = models => {
  //   // Table.hasMany(models.Order, {
  //   //   onDelete: "cascade"
  //   // });
  //   FoodMenu.belongsTo(models.Restaurant, {
  //     foreignKey: "restaurant_id"
  //   });
  // };

  return FoodMenu;
};

module.exports = (sequelize, DataTypes) => {
  let Menu = sequelize.define("Menu", {
    name: DataTypes.STRING,
    wholesalePrice: DataTypes.FLOAT,
    retailPrice: DataTypes.FLOAT,
    stockQty: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  });
  return Menu;
};

module.exports = (sequelize, DataTypes) => {
  let Sale = sequelize.define("Sale", {
    expenses: DataTypes.FLOAT,
    sales: DataTypes.FLOAT,
    restaurantID: DataTypes.INTEGER
  });

  return Sale;
};

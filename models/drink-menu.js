module.exports = (sequelize, DataTypes) => {
  let DrinkMenu = sequelize.define("DrinkMenu", {
    name: DataTypes.STRING,
    wholesalePrice: DataTypes.FLOAT,
    retailPrice: DataTypes.FLOAT
  });
  DrinkMenu.associate = models => {
    // Food item from FoodMenu should belong to a certain Category
    // A food item can't be created without a Category due to the foreign key constraint
    DrinkMenu.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return DrinkMenu;
};

module.exports = (sequelize, DataTypes) => {
  let Waiter = sequelize.define("Waiter", {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  Waiter.associate = models => {
    // Each Restaurant has many employees
    // A new employee can't be created without a Restraunt in order to get access to menus
    Waiter.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Waiter;
};

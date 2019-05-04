module.exports = (sequelize, DataTypes) => {
  let Order = sequelize.define("Order", {
    item: DataTypes.STRING,
    itemQty: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  });

  Order.associate = models => {
    Order.belongsTo(models.Table, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Order;
};

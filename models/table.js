module.exports = (sequelize, DataTypes) => {
  let Table = sequelize.define("Table", {
    tableNumber: DataTypes.INTEGER,
    guestQty: DataTypes.INTEGER
  });

  Table.associate = models => {
    Table.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false
      }
    });
    Table.hasMany(models.Order, {
      onDelete: "cascade"
    });
  };

  return Table;
};

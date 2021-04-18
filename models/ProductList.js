const Sequelize = require("sequelize");

module.exports.productListDef = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productList_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subcategory_id:{
        allowNull: false,
        type: Sequelize.STRING
      },
      productList_image:{
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
}
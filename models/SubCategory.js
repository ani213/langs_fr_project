const Sequelize = require("sequelize");

module.exports.subCategoryDef = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subcategory_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category_id:{
        allowNull: false,
        type: Sequelize.STRING
      },
      category_image:{
        allowNull: true,
        type: Sequelize.STRING
      },
      offer:{
        allowNull: true,
        type: Sequelize.STRING
      },
      quantity:{
        allowNull: true,
        type: Sequelize.STRING
      },
      price:{
        allowNull: false,
        type: Sequelize.STRING
      },
      rating:{
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
};


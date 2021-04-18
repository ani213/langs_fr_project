'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductLists', {
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
         
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductList');
  }
};

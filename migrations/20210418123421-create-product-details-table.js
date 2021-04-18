'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductDetails', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          productDetails_name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          productList_id:{
            allowNull: false,
            type: Sequelize.STRING
          },
          productDetails_image:{
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
          details:{
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
    return queryInterface.dropTable('ProductDetails');
  }
};

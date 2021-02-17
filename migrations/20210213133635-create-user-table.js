'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          email:{
            allowNull:false,
            type:Sequelize.STRING
          },
          mobileNumber:{
            allowNull:false,
            type:Sequelize.STRING
          },
          hashPassword:{
            allowNull: false,
            type: Sequelize.STRING
          },
          salt:{
            allowNull: false,
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
    return queryInterface.dropTable('Users');
  }
};
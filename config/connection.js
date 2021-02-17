const Sequelize=require("sequelize");
let sequelize= new Sequelize("test", "root", "password", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });

sequelize
  .authenticate()
  .then(() => {
    // console.log('database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports=sequelize
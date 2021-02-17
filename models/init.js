let util=require("../util");
let user=require("./User");
let sequelize=require("../config/connection");
const tableOption={
    timestamps: true,
    paranoid: true
}
module.exports=function(){
    console.log("init");
    util.model.User=sequelize.define('Users',user.userDef,tableOption);
}
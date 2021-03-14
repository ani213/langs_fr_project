let util=require("../util");
let user=require("./User");
let category=require("./Category");
let subCategory=require("./SubCategory")
let sequelize=require("../config/connection");
const tableOption={
    timestamps: true,
    paranoid: true
}
module.exports=function(){
    console.log("init");
    util.model.User=sequelize.define('Users',user.userDef,tableOption);
    util.model.Category=sequelize.define('Categories',category.categoryDef,tableOption);
    util.model.SubCategory=sequelize.define('SubCategories',subCategory.subCategoryDef,tableOption);
    

    util.model.Category.hasMany(util.model.SubCategory,{as: 'subCategories',foreignKey: 'category_id'})



}
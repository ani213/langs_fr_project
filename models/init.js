let util=require("../util");
let user=require("./User");
let category=require("./Category");
let subCategory=require("./SubCategory")
let sequelize=require("../config/connection");
let productList=require("./ProductList");
let productDetails=require('./ProductDetails');
const tableOption={
    timestamps: true,
    paranoid: true
}
module.exports=function(){
    console.log("init");
    util.model.User=sequelize.define('Users',user.userDef,tableOption);
    util.model.Category=sequelize.define('Categories',category.categoryDef,tableOption);
    util.model.SubCategory=sequelize.define('SubCategories',subCategory.subCategoryDef,tableOption);
    util.model.ProductList=sequelize.define('ProductLists',productList.productListDef);
    util.model.ProductDetails=sequelize.define('ProductDetails',productDetails.productDetailsDef);

    util.model.ProductList.hasMany(util.model.ProductDetails,{as: 'productDetails',foreignKey: 'productList_id', onDelete: 'cascade'} )    
    util.model.SubCategory.hasMany(util.model.ProductList,{as: 'productLists',foreignKey: 'subCategory_id', onDelete: 'cascade'} )
    util.model.Category.hasMany(util.model.SubCategory,{as: 'subCategories',foreignKey: 'category_id', onDelete: 'cascade'} )



}
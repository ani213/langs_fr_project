const userController=require('./controller/user');
const categoryController=require("./controller/category");
const subcategoryController=require("./controller/subCategory");
const productListController=require('./controller/productList')
const productDetailsController=require('./controller/productDetails')
module.exports=function(router,auth){

    router.route('/me').get(userController.me);    
    router.route('/category').post(categoryController.createCategory);
    router.route('/subcategory').post(subcategoryController.createSubCategory);
    router.route('/category').get(categoryController.getCategory);
    router.route('/subcategory/:id').get(subcategoryController.getSubCategoryById);
    router.route('/product/subcategory/:id').get(subcategoryController.getSubCategoryByCatogeryId);
    router.route('/category').put(categoryController.editCategory);
    router.route('/category/:id').delete(categoryController.deleteCategory);
    router.route('/productList').post(productListController.createProductList);
    router.route('/productList').put(productListController.updateProductList);
    router.route('/productList').get(productListController.getAllProductList)
    router.route('/productList/:id/productDetails').get(productDetailsController.getProductDetailsList);
    router.route('/productDetails').post(productDetailsController.createProductDetails);
    router.route('/productDetails').put(productDetailsController.updateProductDetails);
    router.route('/productDetails/:id').get(productDetailsController.getProductDetails);



    router.route('/user/regester').post(userController.regesterUser);
    router.route('/user/login').post(userController.loginUser);
    router.route('/user/forget').put(userController.forgetPassword);
    router.route('/user/reset').put(userController.resetPassword);


    // router.route("/test").get(auth.x_csrf_auth,userController.test)

    router.route("/up").post(categoryController.uploadZipFile)
}
const userController=require('./controller/user');
const categoryController=require("./controller/category");
const subcategoryController=require("./controller/subCategory");

module.exports=function(router,auth){

    router.route('/me').get(userController.me);    
    router.route('/category').post(categoryController.createCategory);
    router.route('/subcategory').post(subcategoryController.createSubCategory);
    router.route('/category').get(categoryController.getCategory);
    router.route('/subcategory/:id').get(subcategoryController.getSubCategoryById);
    router.route('/product/subcategory/:id').get(subcategoryController.getSubCategoryByCatogeryId);
    router.route('/category').put(categoryController.editCategory);
    router.route('/category/:id').delete(categoryController.deleteCategory);


    router.route('/user/regester').post(userController.regesterUser);
    router.route('/user/login').post(userController.loginUser);
    router.route('/user/forget').put(userController.forgetPassword);
    router.route('/user/reset').put(userController.resetPassword);


    router.route("/test").get(auth.x_csrf_auth,userController.test)

    router.route("/up").post(categoryController.uploadZipFile)
}
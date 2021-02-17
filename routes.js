const userController=require('./controller/user')
const auth=require("./auth");
module.exports=function(router){
    router.route('/user/regester').post(userController.regesterUser);
    router.route('/user/login').post(userController.loginUser);
}
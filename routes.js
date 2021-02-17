const userController=require('./controller/user')

module.exports=function(router){
    router.route('/user/regester').post(userController.regesterUser)
}
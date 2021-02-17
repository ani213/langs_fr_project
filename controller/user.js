let util=require("../util");
let common=require("../common");
var jwt = require('jsonwebtoken');
var key=require("../key")
module.exports.regesterUser=(req,res)=>{
    _validateUser(req).then((user)=>{
       util.model.User.build(user).save()
       .then((result)=>{
           res.send({message:"Success"})
       }).catch((err)=>{
        res.status(400).send({message:err.message});
    })
    }).catch((err)=>{
        res.status(400).send({message:err.message});
    })
}

const _validateUser=(req)=>{
    return new Promise((resolve,reject)=>{
        let data={}
        if(req.body.name){
                data["name"]=req.body.name;
        }else{
            reject(new Error("Name is missing."))
        }
       
        if(req.body.mobileNumber){
            const reg=/^\d{10}$/;
            if(reg.test(req.body.mobileNumber)){
                util.model.User.findOne({where:{mobileNumber:req.body.mobileNumber}})
                .then((user)=>{
                    if(user){
                      reject(new Error("Mobile Number allready exist"));   
                    }
                    else{
                        data.mobileNumber=req.body.mobileNumber;
                    } 
                })
            }else{
                 reject(new Error("Mobile Number should be 10 degit."));             
            }
        }else{
            reject(new Error("Mobile Number required but missing."));    
        }  
        if(req.body.password){
            data.password=req.body.password;                  
          }else{
            reject(new Error("password is missing."))
        }   
        if(req.body.email){
            util.model.User.findOne({where:{email:req.body.email}})
            .then((user)=>{
                if(user){
                 reject(new Error("this email is allready exist."))
                }else{
                    data["email"]=req.body.email;
                    let salt=common.salt();
                    let hashPassword=common.encryptPassword(req.body.password,salt);
                    data.salt=salt;
                    data.hashPassword=hashPassword
                    resolve(data)
                }
            })
         } 
         else{
             reject(new Error("email is missing."))
         }  
    })
}

module.exports.loginUser=(req,res)=>{

    if(req.body.email||req.body.mobileNumber){
        if(req.body.email){
            util.model.User.findOne({
                where:{email:req.body.email},
            })
            .then((user)=>{
                if(user){
                    if(common.checkPassword(req.body.password,user.hashPassword,user.salt)){
                        let userData={
                            name:user.name,
                            email:user.email
                        }
                        let token=jwt.sign({name:user.name,email:user.email,salt:user.salt},key.key)
                        res.send({user:userData,token:token})
                    }else{
                         res.status(400).send({message:"username or password is wrong"});
                    }
                }else{
                 res.status(400).send({message:"user not found"});
                }
            }).catch((err)=>{
                res.status(400).send({message:err.message});
            })
        }
       if(req.body.mobileNumber){
        util.model.User.findOne({where:{mobileNumber:req.body.mobileNumber}})
        .then((user)=>{
            if(user){
                if(common.checkPassword(req.body.password,user.hashPassword,user.salt)){
                    let userData={
                        name:user.name,
                        email:user.email
                    }
                    let token=jwt.sign({name:user.name,email:user.email,salt:user.salt},key.key)
                    res.send({user:userData,token:token})
                }else{
                     res.status(400).send({message:"username or password is wrong"});
                }
            }else{
             res.status(400).send({message:"user not found"});
            }
        }).catch((err)=>{
            res.status(400).send({message:err.message});
        })
       } 
    }else{
        res.status(400).send({message:"email or mobile number required but missing"});
    }
}

module.exports.forgetPassword=(req,res)=>{
    if(req.body.email&&req.body.password){
       let salt=common.salt();
       let hashPassword=common.encryptPassword(req.body.password,salt)
        util.model.User.update({salt:salt,hashPassword:hashPassword},{where:{email:req.body.email}})
        .then((data)=>{
            res.send({message:"success"})
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
    }
}
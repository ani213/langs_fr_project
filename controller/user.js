let util=require("../util");
let common=require("../common");
var jwt = require('jsonwebtoken');
var key=require("../config/key");

let _generateToken=(data,time)=>{
    return jwt.sign(data,key.secret,{ expiresIn: time||"1h" })
}

module.exports.me=(req,res)=>{
   let token=_generateToken({key:key.key},"10h")
   res.send({x_csrf:token})
}

module.exports.regesterUser=(req,res)=>{
    _validateUser(req).then((user)=>{
        console.log(user)
       util.model.User.build(user).save()
       .then((result)=>{
           let data={
            "status": result.status,
            "id": result.id,
            "longitude": result.longitude,
            "latitude": result.latitude,
            "deviceId": result.deviceId,
            "deviceToken": result.deviceToken,
            "name": result.name,
            "mobileNumber": result.mobileNumber,
            "email": result.email,
           }
           res.send(data)
       }).catch((err)=>{
        res.status(400).send({message:err.message});
    })
    }).catch((err)=>{
        res.status(400).send({message:err.message});
    })
}

const _validateUser=(req)=>{
    // console.log(req.body,"validate")
    return new Promise((resolve,reject)=>{
        let data={};
        data["longitude"]=req.body.longitude;
        data["latitude"]=req.body.latitude;
        data["deviceId"]=req.body.deviceId;
        data["deviceToken"]=req.body.deviceToken;
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
//    console.log(req.body)
    if(req.body.email||req.body.mobileNumber){
        if(req.body.email){
            util.model.User.findOne({
                where:{email:req.body.email},
            })
            .then((user)=>{
                if(user){
                    
                    if(common.checkPassword(req.body.password,user.hashPassword,user.salt)){
                        let data={
                            "status": user.status,
                            "id": user.id,
                            "longitude": user.longitude,
                            "latitude": user.latitude,
                            "deviceId": user.deviceId,
                            "deviceToken": user.deviceToken,
                            "name": user.name,
                            "mobileNumber": user.mobileNumber,
                            "email": user.email,
                           }
                        // let userData=user
                        let token=_generateToken(data,"7h")
                        console.log(token)
                        res.send({user:data,token:token})
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
                    let data={
                        "status": user.status,
                        "id": user.id,
                        "longitude": user.longitude,
                        "latitude": user.latitude,
                        "deviceId": user.deviceId,
                        "deviceToken": user.deviceToken,
                        "name": user.name,
                        "mobileNumber": user.mobileNumber,
                        "email": user.email,
                       }
                    let token=_generateToken(data,"7h")
                    res.send({user:data,token:token})
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
    }else{
        res.status(400).send({message:"email or password is missing"})
    }
}

module.exports.resetPassword=(req,res)=>{
    if(req.body&&req.body.oldPassword&&req.body.email &&req.body.newPassword){
            util.model.User.findOne({
                where:{
                    email:req.body.email,
                }
            }).then((user)=>{
                if(user){
                    if(common.checkPassword(req.body.oldPassword,user.hashPassword,user.salt)){
                        let salt=common.salt();
                        let hashPassword=common.encryptPassword(req.body.newPassword,salt);
                        util.model.User.update({salt:salt,hashPassword:hashPassword},{where:{email:req.body.email}})
                        .then((updatedData)=>{
                            res.send({message:"success"})
                        }).catch((err)=>{
                            res.status(400).send({message:err.message})
                        })
                    }else{
                      res.status(400).send({message:"password or email is wrong"})
                    }
                }else{
                  res.status(400).send({message:"User not found"})
                }
            }).catch((err)=>{
                res.status(400).send({message:err.message})
            })
    }else{
        res.status(400).send({message:"email or oldpassword or newPassword require"})
    }
}

module.exports.test=(req,res)=>{
    res.send({message:"success"})
}
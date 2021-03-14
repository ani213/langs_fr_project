var jwt = require('jsonwebtoken');
let config=require("./config/key")   
   
module.exports= function () {

    return{
          authenticate:(req, res, next)=>{
            if(req.headers['x_csrf']&&req.headers['token']){
                _verifyToken(req.headers['x_csrf'],'x_csrf')
                .then((data)=>{
                    if(data.status){
                        _verifyToken(req.headers['token'],"token")
                        .then((data)=>{
                            if(data.status){
                                req.user=data.decoded;
                                next();
                            }else{
                                res.status(401).send({message:"Unauthorized access"})
                            }
                        })
    
                    }else{
                        res.status(401).send({message:"Unauthorized access token X_csrf"})
                    }
                })
            }else{
                res.status(401).send({message:"Unauthorized access"})
            } 
        },
        x_csrf_auth:(req,res,next)=>{
            console.log(req,"xcsrf")
            if(req.headers['x_csrf']){
                jwt.verify(req.headers['x_csrf'],config.secret,(err,decoded)=>{
                    if(err){
                    res.status(401).send({message:"Unauthorized access x_csrf"})                       
                    }else{
                        if(decoded.key===config.key){
                             console.log(true,"xcsrf")

                           next();
                        }else{
                            res.status(401).send({message:"Unauthorized access x_csrf"})                                                  
                        }
                    }
                })
                
            }else{
                res.status(401).send({message:"Unauthorized access x_csrf"})
            }
        },
  }     
}

_verifyToken=(token,info)=>{
    return new Promise((resolve,reject)=>{
        if(info==="x_csrf"){
            jwt.verify(token,config.secret,(err,decoded)=>{
                if(err){
                    resolve({status:false})
                }else{
                    if(decoded.key===config.key){
                        resolve({status:true})
                    }else{
                        resolve({status:false})
                    }
                }
            })
        }else{
            jwt.verify(token,config.secret,(err,decoded)=>{
                if(err){
                    resolve({status:false})
                }else{
                    resolve({status:true,decoded:decoded})
                }
            })
        }
    })
}
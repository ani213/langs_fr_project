const util=require("../util");
const upload=require("../helper/uploadFile")
module.exports.getProductDetailsList=(req,res)=>{
    if(req.params.id){
        util.model.ProductDetails.findAll(
            {where:{productList_id:req.params.id},
        })
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
    }else{
        res.status(400).send({message:"id required"})
    }
}
module.exports.createProductDetails=async (req,res)=>{
    try{
        await upload.uploadFile(req,res);
        if(req.file){
            req.body["productDetails_image"]=req.file.path;
            util.model.ProductDetails.build(req.body).save()
            .then((data)=>{
                res.send(data);
            }).catch((err)=>{
               res.status(400).send({message:err.message})
            })
        }else{
            util.model.ProductDetails.build(req.body).save()
            .then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.status(400).send({message:err.message})
             })
        }
    }catch(err){
        res.status(400).send({message:err.message})
    }
}
module.exports.updateProductDetails=async (req,res)=>{
    try{
        await upload.uploadFile(req,res);
        if(req.file){
          req.body["productDetails_image"]=req.file.path;                
            util.model.ProductDetails.findOne({where:{id:req.body.id}})
            .then(async (productDetails)=>{
                if(productDetails.productDetails_image){
                    await upload.deleteUploadedFile(productDetails.productDetails_image);
                }
                util.model.ProductDetails.update(req.body,{where:{id:req.body.id}})
                .then((data)=>{
                    res.send({message:"Success"})
                }).catch((err)=>{
                    res.status(400).send({message:err.message})
                })

            })
        }else{
            util.model.ProductDetails.update(req.body,{where:{id:req.body.id}})
            .then((data)=>{
                res.send({message:"Success"})
            }).catch((err)=>{
                res.status(400).send({message:err.message})
            })
        }
}catch(err){
    res.status(401).send({message:err.message})
}
}

module.exports.getProductDetails=(req,res)=>{
    util.model.ProductDetails.findOne({where:{id:req.params.id}})
    .then((data)=>{
        if(data){
            res.send(data)
        }else{
            res.send({message:"not available"})
        }
    }).catch((err)=>{
        res.status(400).send({message:err.message})
    })
}
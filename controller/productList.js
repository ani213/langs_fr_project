const util=require("../util")
const upload=require("../helper/uploadFile")
module.exports.createProductList= async (req,res)=>{
    try{
        await upload.uploadFile(req,res);
        if(req.file){
            req.body["productList_image"]=req.file.path;
            util.model.ProductList.build(req.body).save()
            .then((data)=>{
                res.send(data)
            }).catch((err)=>{
                res.status(400).send({message:err.message})
            })
        }else{
            util.model.ProductList.build(req.body).save()
            .then((data)=>{
                res.send(data)
            }).catch((err)=>{
                res.status(400).send({message:err.message})
            })
        }
    }catch(err){
        res.status(400).send({message:err.message})
    }
}
module.exports.updateProductList=async (req,res)=>{
    try{
            await upload.uploadFile(req,res);
            if(req.file){
              req.body["productList_image"]=req.file.path;                
                util.model.ProductList.findOne({where:{id:req.body.id}})
                .then(async (productList)=>{
                    await upload.deleteUploadedFile(productList.productList_image);
                    util.model.ProductList.update(req.body,{where:{id:req.body.id}})
                    .then((data)=>{
                        res.send({message:"Success"})
                    }).catch((err)=>{
                        res.status(400).send({message:err.message})
                    })

                })
            }else{
                util.model.ProductList.update(req.body,{where:{id:req.body.id}})
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

module.exports.getAllProductList=(req,res)=>{
    util.model.ProductList.findAll()
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.status(400).send({message:err.message})
    })
}

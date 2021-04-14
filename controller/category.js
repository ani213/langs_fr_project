let util=require("../util");
let upload=require("../helper/uploadFile");

module.exports.createCategory=async (req,res)=>{
    try{
        await upload.uploadFile(req,res)
        if(req.file){
                let data=req.body;
               data["product_image"]=req.file.path;
               util.model.Category.build(data).save()
            .then((categeory)=>{
             res.send(categeory)
             }).catch((err)=>{
            res.status(400).send({message:err.message})
         })
        }else{
            util.model.Category.build(req.body).save()
            .then((categeory)=>{
                res.send(categeory)
            }).catch((err)=>{
                res.status(400).send({message:err.message})
            })
        }

    }catch(err){
        if(err.message==="File too large")
        {  
            res.status(400).send({message:"File is too large. File should be maximum 2MB"})
        }else{
        res.status(400).send({message:err.message})
        }
    }
}

module.exports.getCategory=(req,res)=>{
    util.model.Category.findAll(
    //     {
    //     include:["subCategories"]
    // }
    )
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send.status(400).send({message:err.message})
    })
}

module.exports.editCategory= async (req,res)=>{
    try{
        await upload.uploadFile(req,res)
        if(req.file){
            let data=req.body;
            data["product_image"]=req.file.path;
           util.model.Category.findOne({where:{id:req.body.id}})
           .then(async (category)=>{
               if(category.product_image){
                await upload.deleteUploadedFile(category.product_image)
                util.model.Category.update(data,{
                    where:{id:req.body.id}
                })
             .then((categeory)=>{
              res.send({message:"success"})
              }).catch((err)=>{
             res.status(400).send({message:err.message})
          })
               }else{
                util.model.Category.update(data,{
                    where:{id:req.body.id}
                })
             .then((categeory)=>{
              res.send({message:"success"})
              }).catch((err)=>{
             res.status(400).send({message:err.message})
          })
               }
           })
    }else{
        util.model.Category.update(req.body,{where:{id:req.body.id}})
        .then((categeory)=>{
            res.send({message:"success"})
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
    }
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
}

module.exports.deleteCategory= async (req,res)=>{
    try{
      let data= await  util.model.Category.findOne({where:{id:req.params.id}})
        if(data && data.product_image){
           await  upload.deleteUploadedFile(data.product_image);
        }
     util.model.Category.destroy({where:{id:req.params.id}})
     .then(()=>{
         res.send({message:"successfully deleted"})
     }).catch((err)=>{
         res.status(400).send({message:err.message})
     })
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
   
}

module.exports.uploadZipFile=async (req,res)=>{
    try{
        await upload.uploadZip(req,res);
        if(req.file){
            res.send(req.file)
        }else{
            res.send({message:"please select file"})
        }
    }catch(err){
        res.status(400).send({message:err.message})
    }
}
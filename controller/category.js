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
        res.send({message:err.message})
    })
}

module.exports.editCategory=(req,res)=>{
    if(req.body.id){
       util.model.update(req.body,{where:""})
    }else{
        res.send({message:"name or image is required"})
    }
}
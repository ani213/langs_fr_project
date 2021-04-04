const util=require("../util");
let upload=require("../helper/uploadFile");

module.exports.createSubCategory=async (req,res)=>{
    try{
        await upload.uploadFile(req,res)
        if(req.file){
                let data=req.body;
               data["subcategory_image"]=req.file.path;
               util.model.SubCategory.build(data).save()
               .then((subcat)=>{
                   res.send(subcat)
               }).catch((err)=>{
                   res.status(400).send({message:err.message})
               })
        }else{
            util.model.SubCategory.build(req.body).save()
               .then((subcat)=>{
                   res.send(subcat)
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

module.exports.getSubCategoryById=(req,res)=>{
    if(req.params.id){
        util.model.SubCategory.findOne({where:{id:req.params.id}})
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
    }else{
        res.status(400).send({message:"id require but missing"})
    }
}
module.exports.getSubCategoryByCatogeryId=(req,res)=>{
    if(req.params.id){
        util.model.SubCategory.findAll({where:{category_id:req.params.id}})
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
    }else{
        res.status(400).send({message:"id require but missing"})
    }
}
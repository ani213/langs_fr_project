const util=require("../util");

module.exports.createSubCategory=(req,res)=>{
    if(req.body){
        util.model.SubCategory.build(req.body).save()
        .then((subcat)=>{
            res.send(subcat)
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
    }else{
        res.status(400).send({message:"subsategory name and id required"})
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
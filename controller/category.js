let util=require("../util");


module.exports.createCategory=(req,res)=>{
    if(req.body){
        util.model.Category.build(req.body).save()
        .then((categeory)=>{
            res.send(categeory)
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
    }else{
        res.status(400).send({message:"product name required but missing"})
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

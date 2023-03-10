const Category = require('../models/category');

exports.getCategoryById = (req,res,next,id) =>{
    Category.findById(id).exec((error,cate)=>{
        if(error){
            return res.status(400).json({
                error:"Category not found in DB"
            });
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req,res) =>{
    const category = new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save Category in DB"
            });
        }
        res.json({category})
    });
};

exports.getCategory =(req,res) =>{
    return res.json(req.category);
}

exports.getAllCategory = (req,res) =>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.stats(400).json({
                error:"No categorys Found"
            });
        }
        res.json(categories)
    });

}

exports.updateCategory = (req,res) =>{
    const category = req.category;
    category.name = req.body.name;
    
    category.save((err,updatedCategory)=>{
        if(err){
            return res.stats(400).json({
                error:"Fail To update Category"
            });
        }
        res.json(updatedCategory);

    });
}
exports.removeCategory = (req,res) =>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.stats(400).json({
                error:"Fail To delete Category"
            });
        }
        res.json({
            message:"Successfully Deleted"
        });

    });
}
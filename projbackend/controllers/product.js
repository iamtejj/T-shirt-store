const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req,res,next,id) => {
    Product.findById(id).exec((err,product) => {
        if(err){
            return res.status(400).json({
                error:"Product not found"
            });
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    
    form.keepExtensions = true ;
    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error:"Problem with images"
            });
        }

        const {name,description,price ,category ,stock} = fields;
        //TODO: restriction on fields
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error:"Please include all details"
            });
        }

        let product = new Product(fields);

        //handle filehere

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too Big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.ContentType = file.photo.type;
        }

        // save to the DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Saving product in DB failed"
                });
            }
            res.json(product);

        })
    });
}

exports.getProduct = ( req , res ) =>{
    req.product.photo = undefined;
    return res.json(req.product);
}

// middleware
exports.photo = (req,res,next) =>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.ContentType);
    }
    next();
}

exports.deleteProduct = (req,res) =>{
    let product = req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete Product"
            });
        }
        res.json({
            message:"deletion of Product successfully",
            deletedProduct
        })
    });

}

exports.updateProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    
    form.keepExtensions = true ;
    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error:"Problem with images"
            });
        }

        // update the product

        let product = req.product;
        product = _.extend(product,fields);
        
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too Big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.ContentType = file.photo.type;
        }

        // save to the DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Updation of product failed"
                });
            }
            res.json(product);

        })
    });
}
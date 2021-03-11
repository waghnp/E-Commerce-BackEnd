import express from 'express';
import Product from '../models/productModel';
import {isAuth,isAdmin} from '../utils'


const router=express.Router();

router.get('/',async (req,res)=>{
    try{
        const products=await Product.find({});
        res.status(201).send(products);
    }catch(error){
        res.status(401).send({msg:error.message})
    }   
})

router.get('/:id',async (req,res)=>{
    try{
        const product=await Product.findOne({_id:req.params.id});
        if(product){
            res.status(201).send(product);
        }else{
            res.status(404).send("Product Not Found")
        }
        
    }catch(error){
        res.status(401).send({msg:error.message})
    }   
})

router.put('/:id',isAuth,isAdmin,async(req,res)=>{
    const product=await Product.findById(req.params.id)
    console.log('from back end for updating product found ',product)
    if(product){
        product.name=req.body.name;
        product.price=req.body.price;
        product.image=req.body.image;
        product.brand=req.body.brand;
        product.catagory=req.body.catagory;
        product.countInStock=req.body.countInStock;
        product.description=req.body.description;
    }
    console.log('after updation ',product)
    const updatedProduct= await product.save();
    console.log("after save ",updatedProduct)
    if(updatedProduct){
        return res.status(200).send({message:'Product Updated',data:updatedProduct})
    }
    return res.status(500).send({message:'Error In Updating Product.'})
})

router.post('/',isAuth,isAdmin,async(req,res)=>{
    const product=new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        brand:req.body.brand,
        catagory:req.body.catagory,
        countInStock:req.body.countInStock,
        description:req.body.description,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
    });
    const newProduct= await product.save();
    if(newProduct){
        return res.status(201).send({message:'New Product Created',data:newProduct})
    }
    return res.status(500).send({message:'Error In Creating Product.'})
})


router.delete('/:id',isAuth,isAdmin,async(req,res)=>{
    const deleteProduct=await Product.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({msg:"Product Deleted"})
    }else{
        res.send({msg:"Error in Deletion"});
    }
})
export default router;
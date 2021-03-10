import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';
// import data from './data';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();

const mongodbUrl=config.MONGODB_URL;

mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
})
.then(()=>console.log("DB connected"))
.catch(error => console.log(error.reason));


const app=express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users',userRoute);
app.use('/api/products',productRoute);

// app.get('/api/products/:id',(req,res)=>{   
//     const productId=parseInt(req.params.id)
//     const product=data.products.find( x => x._id === productId)
//     if(product)
//         res.send(product);
//     else
//         res.status(404).send({msg:"Product Nor Found"});
// })

// app.get('/api/products',(req,res)=>{
//     res.send(data.products);
// })

app.listen(5000,()=>{
    console.log("server started at http://localhost:5000");
})
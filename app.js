
const express=require('express');
const mongoose=require('mongoose');
const app=express();

const products=require('./data.js')
const productsRouter=require('./routes/products.js')

//Send the contents of the .env file to the process.env object
require('dotenv').config({path:"./fichier.env"})

//Use the MONGO_URL to create a connection with your database
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
    .then((result)=>{
        app.listen(3001)
        console.log("conexión exitosa")
    })
    .catch((err)=>console.log(err))

app.use(express.json())
app.use('/api/products', productsRouter)



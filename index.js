const express=require('express');
const app=express();
const PORT=3001;
const products =require('./data.js')

app.listen(PORT, ()=>{
    console.log("Server is running ", PORT)
})

app.get('/api/products', (request, response)=>{
    const partialProducts=products.map(element=>{
        return {id:element.id, name:element.name}
    })
    response.json(partialProducts)
})

app.get('/api/products/:productId', (request, response)=>{
    const id=Number(request.params.productId);
    response.status(200).end()
})
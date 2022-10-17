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
    /*
    Route parameters
    What if you want to load only product with id 1. 
    The convention want to route to be something like: api/products/1

    Espress have a easy way to manage that kind of request
    */
    const product=products.find(element=>element.id===id)
    if(!product){
        return response.status(404).json({
            Message: "Product not found"
        })
    }
    response.json(product)
})

//Query String
/*
Las Query String o cadenas de consultas es un término que 
se utiliza para hacer referencia a una interacción con una base de datos. 
Además, es la parte de una URL que contiene los datos que deben pasar a las aplicaciones web.
A query string is a set of characters tacked onto the end of a URL. 

The query string begins after the question mark (?) and can include one or more parameters.
Each parameter is represented by a unique key-value pair or a set of two linked data items. 
An equals sign (=) separates each key and value. An ampersand (&) separates multiple parameters. 
Here’s an example of a URL with a query string including three parameters.

https://www.tech.com/search?query=database+tools&star_rating=4&order=alphabetical
*/
app.get('/api/query', (request, response)=>{
    const name=request.query.name.toLowerCase();
    const product=products.filter((element)=>{
        return element.name.toLowerCase().includes(name)
    })
    if (product<1) {
        return response.status(200).send("No products matched your search")
    }
    response.json(product);
})

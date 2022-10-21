
const express=require('express');
const app=express();
const PORT=3001;
const products =require('./data.js')
/*
Middleware
Middleware are functions that execute during the request to the server. 
Those functions have access to the request and response parameters 
so can perform many things to enhance/automate API functionalities
The middleware sit in between the request and response
user request -> midlleware -> response
*/
const logger=(request, res, next)=>{
    console.log(request.url)
    console.log(request.params)
    console.log(request.query)
    next()
}
const auth  = (req, res, next) => {
    const user = req.query.user
    if (user === 'admin') {
        req.user = { name: 'admin', id: 1 }
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}
app.use(express.json())
app.use(logger)
//app.use(logger) // execute your middleware for all requests
//app.use('/api', logger)//You can also execute your middleware only for request that are under a specific path ex: /api
//app.use([logger, auth])//Multiple middleware can be use
//se van a ejecutar en el mimso orden que estan escritas

/*
When the user visit /about Express will execute the app.get(). 
But just before, it will execute the middleware specified in the app.use().
Once the middleware is executed the next() will continue the app.get() execution

Here is the sequence of execution:

client request → /about ⇒ logger() → app.get() → client response

When creating a middleware you are not force to use the next(). 
You can send your own response and override/omit the app.get() completely
*/

app.listen(PORT, ()=>{
    console.log("Server is running ", PORT)
})

app.get('/about', (request, response)=>{
    console.log(request.user)
    return response.send('About page')
})

app.get('/api/products', (request, response)=>{
    // const partialProducts=products.map(element=>{
    //     return {id:element.id, name:element.name}
    // })
    response.json(products)
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

app.post('/api/products', (request, response)=>{
    const newProduct={
        id:products.length+1,
        name:request.body.name,
        price:request.body.price
    }
    products.push(newProduct)
    response.status(201).json(newProduct)
})

app.put('/api/products/:productId', (request, response)=>{
    const id=Number(request.params.productId);
    const index=products.findIndex(element=>element.id===id)
    if (index===-1) {
        response.status(404).json({
            Message: "Product not found"
        })
    }
    const updateProduct={
        id:products[index].id,
        name:request.body.name,
        price:request.body.price
    }
    products[index]=updateProduct
    response.status(200).json("Product updated")
})

app.delete('/api/products/:productId', (request, response)=>{
    const id=Number(request.params.productId);
    const index=products.findIndex(element=>element.id===id);
    if (index===-1) {
        response.status(404).json({
            Message: "Product not found"
        })
    }
    products.splice(index, 1);
    response.status(200).json("Product deleted")
})

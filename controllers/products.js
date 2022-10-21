
const products =require('../data.js')
const getProducts=((request, response)=>{
    response.json(products)
})

const getProduct=((request, response)=>{
    const id=Number(request.params.productId)
    const product=products.find(element=>element.id===id)
    if(!product){
        return response.status(404).json({
            Message: "Product not found"
        })
    }
    response.json(product)
})

const createProduct=((request, response)=>{
    const newProduct={
        id:products.length+1,
        name:request.body.name,
        price:request.body.price
    }
    products.push(newProduct)
    response.status(201).json(newProduct)
})

const updateProduct=((request, response)=>{
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

const deleteProduct=((request, response)=>{
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

module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
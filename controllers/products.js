const product=require('../models/Product.js');

const getProducts=(req, res)=>{
    product.find({})
    .then(result=>res.status(200).json({result}))
    .catch(err=>res.status(500).json({msg:err}))
}

const getProduct =(req, res)=>{
    product.findOne({_id:req.params.productId})
    .then(result=>res.status(200).json({result}))
    .catch(()=>res.status(404).json({msg:"Product not found"}))
}

const createProduct=((req, res)=>{
    product.create(req.body)
    .then(result=>res.status(200).json({result}))
    .catch((error)=>res.status(500).json({msg:error}))
})

const updateProduct=((req, res)=>{
    product.findOneAndUpdate({_id:req.params.productId}, req.body)
    .then(result=>res.status(200).json({result}))
    .catch(error=>res.status(404).json({msg:"Product not found"}))
})

const deleteProduct=((req, res)=>{
    product.findOneAndDelete({_id:req.params.productId})
    .then(result=>res.status(200).json({result}))
    .catch(error=>res.status(404).json({msg:"Product not found"}))
})

module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}






































// const products =require('../data.js')
// const getProducts=((request, response)=>{
//     response.json(products)
// })

// const getProduct=((request, response)=>{
//     const id=Number(request.params.productId)
//     const product=products.find(element=>element.id===id)
//     if(!product){
//         return response.status(404).json({
//             Message: "Product not found"
//         })
//     }
//     response.json(product)
// })

// const createProduct=((request, response)=>{
//     const newProduct={
//         id:products.length+1,
//         name:request.body.name,
//         price:request.body.price
//     }
//     products.push(newProduct)
//     response.status(201).json(newProduct)
// })

// const updateProduct=((request, response)=>{
//     const id=Number(request.params.productId);
//     const index=products.findIndex(element=>element.id===id)
//     if (index===-1) {
//         response.status(404).json({
//             Message: "Product not found"
//         })
//     }
//     const updateProduct={
//         id:products[index].id,
//         name:request.body.name,
//         price:request.body.price
//     }
//     products[index]=updateProduct
//     response.status(200).json("Product updated")
// })

// const deleteProduct=((request, response)=>{
//     const id=Number(request.params.productId);
//     const index=products.findIndex(element=>element.id===id);
//     if (index===-1) {
//         response.status(404).json({
//             Message: "Product not found"
//         })
//     }
//     products.splice(index, 1);
//     response.status(200).json("Product deleted")
// })

// module.exports={
//     getProducts,
//     getProduct,
//     createProduct,
//     updateProduct,
//     deleteProduct
// }
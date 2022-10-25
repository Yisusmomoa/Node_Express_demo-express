//First create an instance to the Router object
const express=require('express')
const router=express.Router();

//Then import all the controller functions.
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}=require('../controllers/products')

router.get('/products/', getProducts);

router.get('/products/:productId', getProduct);

router.post('/products/', createProduct);

router.put('/products/:productId', updateProduct);

router.delete('/products/:productId', deleteProduct);

module.exports=router;



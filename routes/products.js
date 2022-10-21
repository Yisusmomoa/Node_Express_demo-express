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

router.get('/', getProducts);

router.get('/:productId', getProduct);

router.post('/', createProduct);

router.put('/:productId', updateProduct);

router.delete('/:productId', deleteProduct);

module.exports=router;



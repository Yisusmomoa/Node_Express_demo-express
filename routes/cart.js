const express=require('express')
const router=express.Router();

const {
    getCartByUser,
    addProductCart
}=require('../controllers/cart.js')


router.get('/cart/:idUser', getCartByUser);
router.post('/cart/:idUser', addProductCart)
module.exports=router
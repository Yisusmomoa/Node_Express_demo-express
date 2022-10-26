const cart=require('../models/Cart.js');

const getCartByUser=(req, res)=>{
    const id=req.params.idUser;
    cart.findOne({user:id})
    .then(result=>res.status(200).json({result}))
    .catch(err=>res.status(500).json({err}))
}
const addProductCart=async (req, res)=>{
    const id=req.params.idUser;
    console.log(req.body);
    const result=await cart.findOne({user:id});
    if (!result) {
        cart.create(req.body)
        .then(result=>res.status(201).json({result}))
        .catch(err=>res.status(500).json({err}))      
    }
    else {
        // console.log(result.listProds);
        const itemIndex=result.listProds.findIndex(p=>p.id==req.body.listProds[0]._id);
        if (itemIndex===-1) {
            result.listProds.push(req.body.listProds);
        }
    }
}
module.exports={
    getCartByUser,
    addProductCart
}



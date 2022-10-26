const mongoose=require('mongoose');
const users=require('./User')
const products=require('./Product')

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:'users'
    },
    listProds:[{
        name:String,
        price:Number
    }]
})
const cart=mongoose.model('Cart', cartSchema)

module.exports=cart
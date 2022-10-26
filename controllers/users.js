const user=require('../models/User.js');

const getUsers=(req, res)=>{
    user.find({})
    .then(result=>res.status(200).json({result}))
    .catch(err=>res.status(500).json({msg:err}))
}

const createUser=(req, res)=>{
    user.create(req.body)
    .then(result=>res.status(200).json({result}))
    .catch((err)=>res.status(500).json({msg:err}))
}

const getUserById=(req, res)=>{
    user.findOne({_id:req.params.userId})
    .then(result=>res.status(200).json({result}))
    .catch((err)=>res.status(500).json({msg:err}))
}

const getUserByEmailPassword=(req, res)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    user.findOne({
        email:req.body.email,
        password:req.body.password
    })
    
    .then(result=>res.status(200).json({result}))
    .catch(err=>res.status(500).json({msg:err}))
}

/*
http://localhost:3001/api/users/login
{
  "email":"us2@gmail.com",
  "password":"123456"
}
*/

module.exports={
    getUsers,
    createUser,
    getUserById,
    getUserByEmailPassword
}
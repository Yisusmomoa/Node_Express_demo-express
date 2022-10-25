//First create an instance to the Router object
const express=require('express')
const router=express.Router();


//Then import all the controller functions.
const {
     getUsers,
    getUserById,
    createUser,
    getUserByEmailPassword
}=require('../controllers/users')

router.get('/users/', getUsers)
router.get('/users/:userId', getUserById);
router.post('/users/', createUser);
router.post('/users/login', getUserByEmailPassword);


module.exports=router;
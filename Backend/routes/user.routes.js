const express=require('express');
const router =express.Router();
const {body}=require("express-validator")
const userController = require('../controllers/user.controller');   
const {authUser} = require('../Middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be at least 3 character long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last Name must be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password is required and must be at least 6 characters long')
],userController.loginUser);

router.get('/profile',authUser,userController.getUserProfile);

router.get('/logout',authUser,userController.logoutUser);

module.exports = router;
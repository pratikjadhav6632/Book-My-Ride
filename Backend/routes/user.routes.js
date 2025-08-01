const express=require('express');
const router =express.Router();
const {body}=require("express-validator")
const userController = require('../controllers/user.controller');   

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be at least 3 character long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last Name must be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],userController.registerUser)

module.exports = router;
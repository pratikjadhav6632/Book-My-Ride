const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const captainController=require('../controllers/captain.controller');

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charcter'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be at least 3 charcter'),
    body('email').isEmail().withMessage('Email must be valid email address'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 character long'),
    body('vehical.color').isLength({min:3}).withMessage('Vehical color must be at least 3 character long'),
    body('vehical.plate').isLength({min:3}).withMessage('Vehical plate must be at least 3 character long'),
    body('vehical.capacity').isInt({min:1}).withMessage('Vehical capacity must be at least 1'),
    body('vehical.vehicalType').isIn(["XUV","sedan","Motor","car","auto"]).withMessage('Vehical type is required')
],captainController.registerCaptain);

module.exports=router;
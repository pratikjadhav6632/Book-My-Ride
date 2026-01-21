const captainModel=require("../models/captain.model");
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');  
const blacklistTokenModel =require("../models/blacklistToken.model")
module.exports.registerCaptain=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vehical}=req.body;

    const isCaptainAlreadyExists=await captainModel.findOne({email})

    if(isCaptainAlreadyExists){
        return res.status(400).json({message:"Captain already exists"});
    }

    const hashPassword=await captainModel.hashPassword(password);

    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehical.color,
        plate:vehical.plate,
        capacity:vehical.capacity,
        vehicalType:vehical.vehicalType
    });

    const token=captain.generateAuthToken();
    console.log(captain);
   // console.log(token);

    res.status(201).json({token:token,captain});
}

module.exports.loginCaptain=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;

    const captain = await captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const isMatch=await captain.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const token=captain.generateAuthToken();

    res.cookie("token",token);

    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile=async(req,res)=>{
    const captain=req.captain;

    res.status(200).json({captain});
}

module.exports.logoutCaptain=async(req,res)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token});
    res.clearCookie("token");
    res.status(200).json({message:"Logged out successfully"});
}
const captainModel=require('../models/captain.model');

module.exports.createCaptain=async(
    {firstname,lastname,email,password,color,plate,capacity,vehicalType}
)=>{
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicalType){
        throw new Error("All Fields are required");
    }

    const captain=captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehical:{
            color,
            vehicalType,
            capacity,
            plate
        }
        })
        return captain;
    } 
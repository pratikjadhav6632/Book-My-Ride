const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 character long"]
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3,"Last name must be at least 3 character long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"Email must be at least 5 character long"],
        maxlength:[100,"Email must be at most 100 character long"],
        match:[/^\S+@\S+\.\S+$/,"Email must be a valid email address"]
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Password must be required at least 8 character long"],
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    role:{
        type:String,
    },
    vehical:{
        color:{
            type:String,
            required:true,
            minlength:[3,"Color must be at least 3 characters long"],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"Plate must be at least 3 character long"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must be at least 1"]
        },
        vehicalType:{
            type:String,
            required:true,
            enum:["XUV","sedan","Motor","car","auto"],
        },
    },
    location:{
        lat:{
            type:Number,
        },
        lang:{
            type:Number,
        }
    }

});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,({expiresIn: '24h'}));
  return token;
};

captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel=mongoose.model('captain',captainSchema);

module.exports=captainModel;
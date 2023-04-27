import mongoose , { Schema } from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({

    name : {
        type:String,
        required : [true," Please Enter your Name "],
    },
    email: {
        type:String,
        required : [true, " Please Enter your Email "],
        unique : true,
        validate : validator.isEmail,
    },
    password : {
        type:String,
        required :  [true, " Please Enter your Password "],
        minLength : [6,"Password must be atleast 6 char"],
        select : false,
    },
    role : {
        type:String,
        enum : ["admin","user"],
        default : "user",
    },
    subscription : {
        id : String,
        status : String
    },
    playlist : [
        {
            course : {
                type:mongoose.Schmea.Types.ObjectId,
                ref : "Course",
            },
            poster : String,
        }
    ],
    createdAt : { 
        type:Date,
        default : Date.now,
    },
}) 

export const User = mongoose.model("User",schema)
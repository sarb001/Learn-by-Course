import mongoose from "mongoose";
import { User } from '../Models/User.js';
import  bcrypt  from 'bcrypt';

import jwt  from "jsonwebtoken";

export const register = async(req,res,next) => {
   
        const { name,email , password } = req.body;
        try{  
            if(!name || !email || !password){
                return res.json({message : " Please Fill All the Fields "})
            }
            let user = await User.findOne({email})
            if(user){
                return res.json({message : ' user Already Existed '})
            }
            
            let hashpass = await bcrypt.hash(password,10)
           
            const createuser = await User.create({
                name,
                email,
                password : hashpass
            })
            console.log(' Hash Pass is  --',hashpass);
            console.log('created user is --',createuser);

            var token = jwt.sign({_id : createuser._id},'ekekkkeke' , {
                    expiresIn : '1d',
            })

            console.log(' Signup token is - ',token);

            const options = {
                expires : new Date(Date.now()),
                httpOnly : true,
                // secure : true,
            }

           return  res.status(201).cookie("token" , token , options).json({
                message : " User Created Now",
                token,
            })

        }catch(error){
            console.log('Error While Registering is- ',error);
        }

}

export const login = async(req,res) => {

    const { email,password }  = req.body;

        try{

            if(!email || !password){
                return res.json({message : " Please Fill All the Fields  "})
            }

            let user = await User.findOne({email}).select("+password");

            if(!user) return res.json({message: " User not Present "})
            const ismatch = await bcrypt.compare(password,user.password);

            if(!ismatch){
                 return res.json({message : ' InCorrect Email or Password '});
            }else{

                var token = jwt.sign({_id : user._id},'ekekkkeke' , {
                    expiresIn : '1d',
                   })

                console.log(' Login token is - ',token);
                 const options = {
                    expires : new Date(Date.now()),
                    httpOnly : true,
                    // secure : true,
                }
    
               return  res.status(200).cookie("token" , token , options).json({
                    message : ` Now ${user.name} Logged In Bro  `,
                    token,
                })
            }

        }catch(error)
        {
            console.log('Error While Login is- ',error);
        }

}

export const logout = async(req,res) => {
    res.status(200).cookie("token",null , {
        expires : new Date(Date.now()),
        httpOnly : true,
    }).json({
        message : " Logged Out Perfectly "
    })
}

export const getuserprofile = async(req,res) => {

    try{
        const getuser = await User.findById(req.user._id);
        
        res.status(200).json({
            message : " User Found",
            getuser
        })
    }catch(error)
    {
        console.log('error is --',error);
    }

}
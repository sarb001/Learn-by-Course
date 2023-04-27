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

            console.log('token is - ',token);

            // res.cookie()

         const options = {
            expires : new Date(Date.now()),
            httpOnly : true,
            secure : true,
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

}
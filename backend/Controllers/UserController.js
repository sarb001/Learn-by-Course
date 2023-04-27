import mongoose from "mongoose";
import { User } from '../Models/User.js';

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
            const createuser = await User.create({
                name,email ,password
            })
            console.log('created user is --',createuser);

           return  res.status(201).json({
                message : " User Created  "
            })

        }catch(error){
            console.log('Error While Registering is- ',error);
        }

}

export const login = async(req,res) => {

}
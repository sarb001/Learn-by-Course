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
           
            const createuser = await User.create({
                name,
                email,
                password 
            })

            console.log('created user is --',createuser);

            //creating Token 
            var token = jwt.sign({_id : createuser._id},'ekekkkeke' , {
                    expiresIn : '15d',
            })

            console.log(' Signup token is - ',token);

            const options = {
                expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                httpOnly : true,
                sameSite : "none", 
            }

           return  res.status(201).cookie("token" , token , options).json({
                message : " User Created Now",
                createuser,
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

            const ismatch = await user.comparePassword(password);

            if(!ismatch){
                 return res.json({message : ' InCorrect Email or Password '});
            }else{

                var token = jwt.sign({_id : user._id},'ekekkkeke' , {
                    expiresIn : '15d',
                   })

                console.log(' Login token is - ',token);
                 const options = {
                    expires : new Date(Date.now() +  15 * 24 * 60 * 60 * 1000),
                    httpOnly : true,
                    sameSite : "none", 
                }
    
               return  res.status(200).cookie("token" , token , options).json({
                    message : ` Now ${user.name} Logged In Bro  `,
                    user,
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

export const changepassword = async(req,res) => {
    const {oldpassword,newpassword} = req.body;

    if(!oldpassword || !newpassword){
        return res.json({message: " Please Fill All the Fields "})
    }

    const  userpass  = await User.findById(req.user._id).select("+password");
    const ismatch = await userpass.comparePassword(oldpassword);
    

    if(!ismatch){
        return res.json({message : " Old Password is not Correct "})
    }

    userpass.password = newpassword;
    await userpass.save();

    res.status(200).json({
        message : " Password Updated "
    })
}

export const updateprofile = async(req,res) => {
    const { name ,email } = req.body;

    try{
        if(!email || !name){
            return res.json({message: " Please Fill All the Fields "})
        }
        const user = await User.findById(req.user._id);

        if(name)  { user.name  =  name}
        if(email) { user.email = email}

        await user.save();
        return res.status(200).json({
            message : " Profile Data Updated "
        })

    }catch(error){
    console.log('Error While uDPATE pROFILE',error);
    }

}
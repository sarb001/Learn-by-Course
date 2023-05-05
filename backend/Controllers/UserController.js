import mongoose from "mongoose";
import { User } from '../Models/User.js';
import  bcrypt  from 'bcrypt';

import jwt  from "jsonwebtoken";
import { Course } from "../Models/Course.js";

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
                httpOnly : false,
                secure : true,
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

export const login  = async(req,res) => {

            const { email,password }  = req.body;

            if(!email || !password){
                return res.json({message : " Please Fill All the Fields  "})
            }
            let user = await User.findOne({email}).select("+password");
            if(!user) return res.json({message: " User not Present "})
          
            const ismatch = await bcrypt.compare(password,user.password)

            if(ismatch)
            {
                  var token = jwt.sign({_id : user._id},'ekekkkeke' , {
                    expiresIn : '15d',
                   })

                 console.log(' Login token is - ',token);
                 const options = {
                    expires : new Date(Date.now() +  15 * 24 * 60 * 60 * 1000),
                    httpOnly :true, 
                    secure : true,
                    sameSite : "none", 
                }
    
               return  res.status(200).cookie("token" , token , options).json({
                    message : ` Now ${user.name} Logged In Bro  `,
                    user,
                    token,
                })
            }else{
                return res.json({message : ' InCorrect Email or Password '});
            }

}

export const logout = async(req,res) => {
    res.status(200).cookie("token",null , {
        expires : new Date(Date.now()),
        httpOnly : true,
        secure : true,
        sameSite : "none", 
    }).json({
        message : " Logged Out Perfectly "
    })
}

export const getmyprofile  = async(req,res) => {

    try{
        const getuser = await User.findById(req.user._id);

        res.status(200).json({
            message : " User Found",
            getuser,
        })
    }catch(error)
    {
        console.log('error is --',error);
    }

}


export const changepassword  = async(req,res) => {
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

export const updateprofile   = async(req,res) => {
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

export const forgetpassword  = async(req,res) => {

}

export const  deletemyprofile = async(req,res) => {
    try{
        const deluser = await User.findById(req.user._id);

        await deluser.deleteOne();

        res.status(200).cookie("token",null ,{
            expires : new Date(Date.now())
        }).json({
            message : " User Deleted Successfully "
        })

    }catch(error){
        console.log('Error While Deleting User',error);
    }
}



export const addedtoplaylist = async(req,res) => {

    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.body.id);

    if(!course){ return res.json({message : " Invalid Course ID "})}

    const itemExist = user.playlist.find((item) => {
        if(course._id.toString() === item.course.toString())
        return true;
    })

    if(itemExist) {return res.json({message : " Item already Existed "}) }

    user.playlist.push({ course:course._id})

    await user.save();
    res.status(200).json({
        message : " Added to Playlist "
    })
}

export const removefromplaylist = async(req,res) => {
    const user  = await User.findById(req.user._id);
    const course  = await Course.findById(req.query.id);

    if(!course){
        return res.json({message : " Invalid Course ID "});
    }
    
    const newPlaylist  = user.playlist.filter((item) => {
        if(item.course.toString() !== course._id.toString())
        return item;
    })

    user.playlist = newPlaylist;
    await user.save();

    res.status(200).json({
        success: true,
        message : " Removed From Playlist ",
    })

}



export const getallusers = async(req,res) => {
    const getusers =  await  User.find();
    console.log(' Getall users --',getusers);

    if(!getusers){
        return res.json({message : " No User Available "})
    }

    res.status(200).json({
        message : " All users available are --",
        getusers
    })

}



export const updateUserRole = async(req,res) => {

    const updateuser =  await User.findById(req.params.id);

    if(!updateuser){
        return res.status(200).json({message : " User Not FOund "})
    }

    if(updateuser.role === "user"){
        updateuser.role = "admin"
    }else{
        updateuser.role = "user";
    }

    await updateuser.save();
    res.status(200).json({
         message : " Role Updated "
    })
}

export const DeleteUser = async(req,res) => {

    const { id } = req.params;
    const getuser = await User.findById(id);
    if(!getuser){
        return res.json({message : " User Not Present "})
    }

    getuser.deleteOne();
    res.status(200).json({
        message : " User Deleted By Admin "
    })

}
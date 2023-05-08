
import mongoose from "mongoose";
import { User } from '../Models/User.js';
import  bcrypt  from 'bcrypt';
import { Course } from "../Models/Course.js";
import { sendToken } from  "../Utils/sendToken.js";
import ErrorHandler  from  '../Utils/errorhandler.js';
import { catchAsyncError } from "../Middlewares/catchAsyncError.js";

export const register =   catchAsyncError( async(req,res,next) => {
    const { name,email , password } = req.body;

      if(!name || !email || !password){
          return next(new ErrorHandler(" Please Enter All Fields ",400));
      }
      let user = await User.findOne({email})
      if(user) return next(new ErrorHandler(" User Already Exist ",409));
     
      const createuser = await User.create({
          name,
          email,
          password 
      });

      console.log('created user is --',createuser);
      sendToken(res,user,' Registered Successfully ',201);
})        
           

export const login    =   catchAsyncError (async(req,res,next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("Please enter all field", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

    const ismatch = await bcrypt.compare(password,user.password)

    console.log('ismatched --',ismatch);

    if (!ismatch)
      return next(new ErrorHandler("Incorrect Email or Password", 401));

    sendToken(res, user, `Welcome back, ${user.name}`, 200);
})


export const logout =     catchAsyncError (async(req,res,next) => {
    res.status(200).clearCookie("token" ,null, {
            expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            httpOnly : true,
            secure : true,
            sameSite : "none",
            maxAge : 0,
        }).json({
            sucess : true,
            message : " Logged Out Perfectly "
    })

    // res.status(200).cookie("token",null, {
    //     expires : new Date(Date.now()),
    //     httpOnly : true,
    //     secure : true,
    //     sameSite : "none",
    //     maxAge : -1,
    // }).json({
    //     sucess : true,
    //     message : " Logged Out Perfectly "
    // })
})


export const getmyprofile  =  catchAsyncError (async(req,res,next) => {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success : true,
            user
    })
})

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
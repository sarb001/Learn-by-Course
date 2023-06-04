
import mongoose from "mongoose";
import { User } from '../Models/User.js';
import  bcrypt  from 'bcrypt';
import { Course } from "../Models/Course.js";
import { sendToken } from  "../Utils/sendToken.js";
import ErrorHandler  from  '../Utils/errorhandler.js';
import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import crypto from 'crypto';

export const register =   catchAsyncError( async(req,res,next) => {
    const { name,email , password } = req.body;

      if(!name || !email || !password) return next(new ErrorHandler(" Please Enter All Fieldsss ",400));
      
      let user = await User.findOne({email})
      if(user) return next(new ErrorHandler(" User Already Exist ",409));
     
      user = await User.create({
          name,
          email,
          password 
      });

      sendToken(res,user,' Registered Successfully ',201);
})        
           

export const login    =   catchAsyncError (async(req,res,next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("Please enter all field", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

    const ismatch = await bcrypt.compare(password,user.password)

    if (!ismatch) return next(new ErrorHandler("Incorrect Email or Password", 401));

    sendToken(res, user, `Welcome back, ${user.name}`, 200);
})


export const logout  =   catchAsyncError (async(req,res,next) => {

     const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
     }

      await  res.clearCookie("token", options);
      res.send( "Logged Out Successfully Bro" );
 
})


export const getmyprofile  =  catchAsyncError (async(req,res,next) => {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success : true,
            user
    })
})


export const changepassword  = catchAsyncError(async(req,res,next) => {
    const {oldPassword,newPassword} = req.body;

    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("Please enter all fieldSSS", 400));
    }

    const  user     = await User.findById(req.user._id).select("+password");             
  
    const ismatch    = await bcrypt.compare(oldPassword,user.password)
    
    if(!ismatch)  return next(new ErrorHandler("Old Password is not Correct ", 401));

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success : true,
        message : " Password Updated "
    })
})


export const updateprofile   = catchAsyncError(async(req,res,next) => {
          const { name ,email } = req.body;
 
        if(!email || !name) return next(new ErrorHandler("Please enter all fieldsss", 400));

        const user = await User.findById(req.user._id);

        name ? user.name = name :  <> </> ;
        email ? user.email = email :  <> </> ;

        await user.save();
         res.status(200).json({
            success : true,
            message : " Profile Data Updated "
        })
})


export const forgetpassword  =   catchAsyncError (async(req,res,next) => {

        const { email } = req.body;
         if(!email)return next(new ErrorHandler(" Please Enter Email in Field ",400));
         
            const user  = await  User.findOne({ email });
             if(!user) return next(new ErrorHandler(" User not Found ",400))
           
                const resetToken = await user.getresetToken();
                await user.save();

            const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
            // const message = ` Click on link to reset pass ${url} `;
            
            // await sendEmail(user.email,"  Reset Password  ",message);

           
})


export const resetpassword    =    catchAsyncError(async(req,res,next) => {
     const { token } = req.params;

     const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

     const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {
            $gt : Date.now(),
        }
     })

     if(!user) return next(new ErrorHandler(" Token is invalid or Expired ",401));

     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;

     await user.save();

     res.status(200).json({
        success : true,
        message : " Password Changed Successfully ",
     });
})


export const  deletemyprofile =  catchAsyncError(async(req,res,next) => {
  
        const deluser = await User.findById(req.user._id);

        if(!deluser) return  res.json("User Not Found");
        await deluser.deleteOne();

         res.status(200).cookie("token",null ,{
            expires : new Date(Date.now())
        }).json({
            message : " User Deleted Successfully "
        })
})


export const addedtoplaylist = catchAsyncError(async(req,res,next) => {

    const user   = await User.findById(req.user._id);
    const course = await Course.findById(req.body.id);

    if(!course) return next(new ErrorHandler(" Invalid Course Id ",404));
    const itemExist = user.playlist.find((item) => {
        if(course._id.toString() === item.course.toString())
        return true;
    })

    if(itemExist)  return next( new ErrorHandler(" item Already Exist ",409));
     
    user.playlist.push({ course:course._id})
    await user.save();

    res.status(200).json({
        success  : true,
        message  : " Added to Playlist ",
    })
})


export const removefromplaylist = catchAsyncError(async(req,res,next) => {
    const user    = await User.findById(req.user._id);
    const course  = await Course.findById(req.query.id);

    if(!course)  return next(new ErrorHandler(" Invalid Course ID ",404));

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
})



export const getallusers   = catchAsyncError (async(req,res,next) => {
    const users =  await  User.find();
  
    if(!users) return next(new ErrorHandler(" No User Available ",404))

    res.status(200).json({
        success: true,
        users
    })
})


export const updateUserRole  = catchAsyncError(async(req,res,next) => {

    const user =  await User.findById(req.params.id);

    if(!user)  return next(new ErrorHandler(" User Not Found ",200));

    user.role === "user" ? user.role = "admin" :  user.role = "user";
    await user.save();

    res.status(200).json({
         success: true,
         message : " Role Updated "
    })
})


export const DeleteUser     = catchAsyncError (async(req,res,next) => {

    const { id } = req.params;
    const user = await User.findById(id);

    if(!user) return next(new ErrorHandler(" User Not Present ",200));
    
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message : " User Deleted By Admin "
    })
})



import  { User }  from '../Models/User.js';
import jwt from 'jsonwebtoken';
import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandler from '../Utils/errorhandler.js';

export const isAuthenticated   =  catchAsyncError(async( req,res,next) => {
    const { token } = req.cookies;

    if(!token) return next(new ErrorHandler(" Not Logged In NNNo ",401));

    const decoded = jwt.verify(token,'ekekkkeke');
    req.user = await User.findById(decoded._id);
    next();
})

export const authorizeAdmin = async(req,res,next) => {
    if(req.user.role !== "admin")
        return res.json({message : ` ${req.user.role} is not allowed to Access this Resource `})
    ;
    next();
}
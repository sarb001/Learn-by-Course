
import  { User }  from '../Models/User.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async(req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(401).json({message : " User Not Logged in Broo "})
    }

    const decoded = jwt.verify(token,'ekekkkeke');
    console.log('decoded data is --',decoded);

    req.user = await User.findById(decoded._id);
    next();
}

export const authorizeAdmin = async(req,res,next) => {
    if(req.user.role !== "admin"){
        return res.json({message : ` ${req.user.role} is not allowed to Access this Resource `})
    };
    next();
}
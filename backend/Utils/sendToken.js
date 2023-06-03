
import jwt  from 'jsonwebtoken';

export const sendToken = (res,user,message,statusCode) => {

    // const expirationTime = 3600; ms
    // const expirationTime = 60 * 60 * 1000;      // ms = 1hr W

    const  token = jwt.sign({_id : user._id},'ekekkkeke' , {
        expiresIn : '1h',
       })

    const options = {
        // expires : new Date(Date.now() + expirationTime),
        maxAge   : 60 * 60 * 1000,
        httpOnly : true,
        secure   : true,
        sameSite : "none",
    }

    res.status(statusCode).cookie("token",token,options).json({
         success : true,
         message,
         user,
    });
}   
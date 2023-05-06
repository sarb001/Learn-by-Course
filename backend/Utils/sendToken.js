
import jwt  from 'jsonwebtoken';

export const sendToken = (res,user,message,statusCode) => {
    const  token = jwt.sign({_id : user._id},'ekekkkeke' , {
        expiresIn : '15d',
       })

    const options = {
        expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly :true,
        secure: true,
        sameSite: "none",
    }

    res.status(statusCode).cookie("token",token,options).json({
         success : true,
         message,
         user,
    });
}   
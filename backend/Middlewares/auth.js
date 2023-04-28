import jwt from 'jsonwebtoken';

export const isAuthenticated = async(req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(401).json({message : " User Not Logged in "})
    }

    const decoded = jwt.verify(token,'ekekkkeke');
    console.log('decoded id is --',decoded);

    req.user = await User.findById(decoded._id);
    next();
}
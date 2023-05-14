import { catchAsyncError } from "../Middlewares/catchAsyncError";
import { User } from "../Models/User";
import ErrorHandler from "../Utils/errorhandler";
import { instance } from "../app";


export const buysubscription    = catchAsyncError(async(req,res,next) => {
    const user = await User.findById(req.user._id);

    if(user.role === "admin")
     return next(new ErrorHandler("Admin can't buy Subscription",400));

    // const plain_id = ;

    const subscription = await instance.subscriptions.create({
        plain_id,
        customer_notify:1,
        total_count:12,
    })

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(201).json({
        succes : true,
        subscriptionId : subscription.id,
    });
})


export const cancelsubscription  = catchAsyncError(async(req,res,next) => {

})

export const getRazorpaykey      = catchAsyncError(async(req,res,next) => {

})

export const paymentverification  = catchAsyncError(async(req,res,next) => {
    
})
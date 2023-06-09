import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { User } from "../Models/User.js";
import { Payment } from "../Models/payment.js";
import ErrorHandler from "../Utils/errorhandler.js";
import { instance } from "../app.js";
import crypto from 'crypto';
import {  validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';

export const buysubscription    = catchAsyncError(async(req,res,next) => {

    const user = await User.findById(req.user._id);
    
    if(user.role === "admin") return next(new ErrorHandler("Admin can't buy Subscription",400));  
    
    const plan_id = process.env.PLAIN_ID;

    const subscription = await instance.subscriptions.create({
        plan_id,
        customer_notify:1,
        total_count:12,
    })

    user.subscription.id     = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(201).json({
        success : true,
        subscriptionId : subscription.id,
    });
})

export const paymentverification  = catchAsyncError(async(req,res,next) => {
     
  const { razorpay_payment_id , subscription_id , razorpay_signature } = req.body;
    const user = await User.findById(req.user._id);

    let generated_signature = crypto.createHmac('sha256',"qdkmGMLXwEb6tzKXxrlvN3SY")
    .update(subscription_id+"|"+razorpay_payment_id)
    .digest('hex');
    
     const secret = process.env.RAZORPAY_API_SECRET;

    // const isAuthentic = validatePaymentVerification({'payment_id' : razorpay_payment_id,
    // "subscription_id" : subscription_id },
    // generated_signature,secret)

    
      const isAuthentic  =  instance.payments.paymentVerification({
      "subscription_id" : subscription_id,
      "payment_id" : razorpay_payment_id,
      "signature" : generated_signature
    },secret)
    

    if(!isAuthentic || isAuthentic == "false") { 
        res.json({
            success :''
        })
       return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`)
      }

      await Payment.create({
        razorpay_signature,
        razorpay_payment_id,
        subscription_id 
      })

      user.subscription.status = "active"
      await user.save();
      res.redirect(
        `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
        )

      res.status(201).json({
        success : true,
        subscription_id 
      });
})


export const cancelsubscription  = catchAsyncError(async(req,res,next) => {
    const user = await User.findById(req.user._id);

    const subscriptionId = user.subscription.id;
    let refund = false;
  
    await instance.subscriptions.cancel(subscriptionId);
  
    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });
  
    const gap = Date.now() - payment.createdAt;
  
    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;
  
    if (refundTime > gap) await instance.payments.refund(payment.razorpay_payment_id);
      refund = true;
  
    await payment.remove();
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();
  
    res.status(200).json({
      success: true,
      message: refund
        ? "Subscription cancelled, You will receive full refund within 7 days."
        : "Subscription cancelled, Now refund initiated as subscription was cancelled after 7 days.",
    });
})

export const getRazorpaykey      = catchAsyncError(async(req,res,next) => {
     res.status(200).json({
       success: true,
        key:  process.env.RAZORPAY_API_KEY,
      });
})


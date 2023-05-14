
import express from 'express';
import { buysubscription, cancelsubscription, 
    getRazorpaykey, paymentverification } from '../Controllers/paymentController';
import { isAuthenticated } from '../Middlewares/auth';

const router = express.Router();

router.route('/subscribe').get(isAuthenticated,buysubscription);

router.route('/paymentverification').post(isAuthenticated,paymentverification);

router.route('/razorpaykey').get(getRazorpaykey);

router.route('/subscribe/cancel').delete(isAuthenticated,cancelsubscription);

export default router;
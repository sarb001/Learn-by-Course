import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './Config/Database.js';
import user from './Routes/UserRoutes.js';
import course from './Routes/CourseRoutes.js';
import payment from './Routes/paymentRoutes.js';

import RazorPay from 'razorpay';
import cors from 'cors';
import ErrorMiddleware from './Middlewares/Error.js';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config({
    path:'./Config/config.env'
})

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    methods : ["GET","POST","PUT","DELETE"]
}))

connectdb();
const PORT = process.env.PORT 

app.use(express.json());
app.use(express.urlencoded({extended: true,})
);

app.use(cookieParser())

export const instance = new RazorPay({
    key_id    : process.env.RAZORPAY_API_KEY,           
    key_secret: process.env.RAZORPAY_API_SECRET,       
})

app.use('/api/v1',user);
app.use('/api/v1',course);
app.use('/api/v1',payment);

export default app;

app.listen(PORT,() => {
    console.log(` Server is Running  on ${PORT}  `);
})

app.get('/' , (req,res)  => {
     res.send(`<h2> Server is Running  
     <a href = ${process.env.FRONTEND_URL}>  CLick herer  </a>
     </h2>`)
})


app.use(ErrorMiddleware);
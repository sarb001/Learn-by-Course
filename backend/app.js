import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './Config/Database.js';
import user from './Routes/UserRoutes.js';
import course from './Routes/CourseRoutes.js';
import payment from './Routes/paymentRoutes.js';

import cookieparser from  'cookie-parser';
import RazorPay from 'razorpay';
import cors from 'cors';
import ErrorMiddleware from './Middlewares/Error.js';
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

app.use(cookieparser());
app.use(express.json())

export const instance = new RazorPay({
    key_id    : "rzp_test_NC0PR1FuzOxQdG",           // rzp
    key_secret: "qdkmGMLXwEb6tzKXxrlvN3SY",          // qd
})

app.use('/api/v1',user);
app.use('/api/v1',course);
app.use('/api/v1',payment);

export default app;

app.listen(PORT,() => {
    console.log(` Server is Running ${PORT} Brooo.. `);
})

app.get('/' , (req,res)  => {
     res.send(`<h2> Server is Working Brother   
     <a href = ${process.env.FRONTEND_URL}>  CLick herer  </a>
     </h2>`)
})


app.use(ErrorMiddleware);
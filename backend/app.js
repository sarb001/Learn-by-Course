import express from 'express';
import dotenv from 'dotenv';
import user from './Routes/UserRoutes.js';
import { connectdb } from './Config/Database.js';
import course from './Routes/CourseRoutes.js';
import cookieparser from  'cookie-parser';

import cors from 'cors';
import ErrorMiddleware from './Middlewares/ErrorMiddleware.js';
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

app.use('/api/v1',user);
app.use('/api/v1',course);


app.listen(PORT,() => {
    console.log(` Server is Running ${PORT} Brooo.. `);
})


app.get('/' , (req,res)  => {
     res.send(`<h2> Server is Workinggg gBro   
     <a href = ${process.env.FRONTEND_URL}>  CLick herer  </a>
     </h2>`)
})

app.use(ErrorMiddleware);
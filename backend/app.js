import express from 'express';
import dotenv from 'dotenv';
import user from './Routes/UserRoutes.js';
import course from './Routes/CourseRoutes.js';

import { connectdb } from './Config/Database.js';

import cookieparser from  'cookie-parser';

const app = express();

dotenv.config({
    path:'./Config/config.env'
})

connectdb();
const PORT = process.env.PORT 

app.use(cookieparser());
app.use(express.json())

app.use('/api/v1',user);
app.use('/api/v1',course);


app.listen(PORT,() => {
    console.log(` Server is Running ${PORT} Brooo.. `);
})
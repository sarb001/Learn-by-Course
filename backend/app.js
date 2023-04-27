import express from 'express';
import dotenv from 'dotenv';
import user from './Routes/UserRoutes.js';
import { connectdb } from './Config/Database.js';

const app = express();

dotenv.config({
    path:'./Config/config.env'
})

connectdb();
const PORT = process.env.PORT 


app.use('/api/v1',user);




app.listen(PORT,() => {
    console.log(` Server is Running ${PORT} Brooo.. `);
})
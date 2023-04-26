import express from 'express';
import dotenv from 'dotenv';
const app = express();

dotenv.config({
    path:'./Config/config.env'
})

const PORT = process.env.PORT 

app.listen(PORT,() => {
    console.log(` Server is Running ${PORT} Brooo.. `);
})
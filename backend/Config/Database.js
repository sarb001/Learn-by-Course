import mongoose from "mongoose";
import dotenv from 'dotenv';


export const connectdb = async() => {
    try{
        const { connection } = await mongoose.connect(process.env.MONGO_DB);
        console.log(` Database Connected ++ `); 
    }catch(err){
        console.log(' Database Error  -- ');
    }
}
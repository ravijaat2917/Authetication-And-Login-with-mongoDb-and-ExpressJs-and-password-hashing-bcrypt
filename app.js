import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connectDB/connectdb.js';
import web from './routes/web.js';
import bcrypt from 'bcrypt';
const app = express();

// environmental file configurations...
dotenv.config();
const URL = process.env.DATABASE_URL;
const PORT = process.env.PORT ;

// default engine specification...
app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended:true}));

// database connection...
connectDB(URL);

// routes working
app.use('/' , web);

app.listen(PORT , ()=>{
    console.log(`App Listen on http://localhost:${PORT}`);
})
export {mongoose , express , bcrypt};
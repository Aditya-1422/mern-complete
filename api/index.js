import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'

dotenv.config({path:"api/config.env"})

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(
        console.log("Connected to DB!!!")
    ).catch((err)=>{
        console.log(err)
    })
}

const app = express();

app.use(express.json())  //Allow json input on server
app.use(cookieParser()) // To access the data from token

app.listen(process.env.PORT,()=>{
    console.log(`Server is working ${process.env.PORT}`);
    connectDB();
})

app.use("/api/v1",authRouter);
app.use("/api/v1",userRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message : message
    })
})
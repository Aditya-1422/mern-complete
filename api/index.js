import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js'

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

app.listen(process.env.PORT,()=>{
    console.log(`Server is working ${process.env.PORT}`);
    connectDB();
})

app.use("/api/v1",authRouter);
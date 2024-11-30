import express from 'express'
import dotenv from 'dotenv'

dotenv.config({path:"api/config.env"})

const app = express();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working ${process.env.PORT}`)
})
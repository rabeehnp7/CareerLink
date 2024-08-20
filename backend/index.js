import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoutes from "./routes/user.route.js"
import companyRoutes from "./routes/company.route.js"
import jobRoutes from "./routes/job.route.js"
import applicationRoutes from './routes/application.routes.js'
dotenv.config({})
const app=express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOption))

//api's
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/company",companyRoutes)
app.use("/api/v1/job",jobRoutes)
app.use("/api/v1/application",applicationRoutes)


app.listen(process.env.PORT || 3000,()=>{
    connectDB()
    console.log(`Server is connected at ${process.env.PORT || 3000}`)
})

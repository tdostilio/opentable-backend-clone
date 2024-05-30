import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use(userRoutes)


// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))



export default app
import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
// import userRoutes from './routes/users'

dotenv.config()

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req: Request, res: Response) => { res.send('Hello World') })
// app.use('/api/users', userRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))



export default app
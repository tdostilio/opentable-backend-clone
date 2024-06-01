import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import passport from 'passport'
import setupPassport from './controllers/authController'
import session from 'express-session'

dotenv.config()

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true if served over https
    maxAge: 24 * 60 * 60 * 1000 // 24 hours - not super sensitive
  }
}))

// Initialize passport and set up express to use it
app.use(passport.initialize())
app.use(passport.session())
// Set up passport with the Google strategy
setupPassport(passport)


// Routes
app.use(userRoutes)

// Set up the routes for Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], }), (req, res) => {
  console.log('got here')
})
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/')
}
)

// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))



export default app
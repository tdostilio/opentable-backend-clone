
// routes/userRoutes.ts
import express from 'express'
import passport from 'passport'
import MailerService from '../services/mailerService'

const router = express.Router()

// Google OAuth
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/')
})

// Magic Link
router.get('/auth/link', async (req, res, next) => {
  try {
    // send email with magic link
    const email = req.body.email || "tdostilio@gmail.com"
    await MailerService.sendMagicLink(email, 'http://localhost:3000/auth/link/callback')
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
  }
})

router.get('/auth/link/callback', passport.authenticate('magic-link', { failureRedirect: '/login' }), async (req, res, next) => {
  res.redirect('/')
})

export default router
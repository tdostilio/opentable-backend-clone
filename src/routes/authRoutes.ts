
// routes/userRoutes.ts
import express from 'express'
import passport from 'passport'

const router = express.Router()

// Set up the routes for Google OAuth
router.get('/auth/google', (req, res) => {
  console.log('got here')
})
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/')
})

router.get('/auth/link', passport.authenticate('magic-link', { failureRedirect: '/login' }), async (req, res, next) => {
  res.redirect('/')
})

export default router
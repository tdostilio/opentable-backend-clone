
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

router.get('/auth/link', async (req, res, next) => {
  passport.authenticate('magic-link', { failureRedirect: '/login' }, function (err: any, user: any, info: any, status: any) {
    if (err) { return next(err) }
    if (!user) { return res.redirect('/signin') }
    res.redirect('/account')
  })(req, res, next)
  console.log('got here')
})

export default router
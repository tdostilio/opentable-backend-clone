import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as CustomStrategy } from 'passport-custom'
import dotenv from 'dotenv'
import User from '../models/userModel'
import UserService from '../services/userService'
import { PassportStatic } from 'passport'
import GoogleOAuthService from '../services/googleOauthService'

dotenv.config()

const setupPassport = (passport: PassportStatic) => {
  passport.use('google', new GoogleOAuthService())
  passport.use('magic-link', new CustomStrategy(async function (req: any, done: (error: any, user?: any, options?: any) => void) {
    const email = req.body.email
    if (!email) {
      return done(new Error('Email is required'), null)
    }
    let user
    try {
      user = await User.findOne({ email })
      if (!user) {
        // if not found, create user
        user = await UserService.createUser({ email })
      }
    } catch (err) {
      return done(err, null)
    }

    // send magic link
    // const magicLink = await MagicLinkService.createMagicLink(user)
  }))

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => {
        done(err, null)
      })
  })
}



export default setupPassport
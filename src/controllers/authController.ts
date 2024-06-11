import User from '../models/userModel'
import { PassportStatic } from 'passport'
import GoogleOAuthService from '../services/googleOauthService'
import MagicLinkService from '../services/magicLinkService'

const setupPassport = (passport: PassportStatic) => {

  // service middleware
  passport.use('google', new GoogleOAuthService())
  passport.use('magic-link', new MagicLinkService())

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}



export default setupPassport
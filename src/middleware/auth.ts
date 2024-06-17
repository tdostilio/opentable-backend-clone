import User from '../models/userModel'
import { PassportStatic } from 'passport'
import GoogleAuthService from '../services/googleAuthService'
import MagicLinkService from '../services/magicLinkService'
import GithubAuthService from '../services/githubAuthService'

const setupPassport = (passport: PassportStatic) => {

  // service middleware
  passport.use('google', new GoogleAuthService())
  passport.use('magic-link', new MagicLinkService())
  passport.use('github', new GithubAuthService())

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
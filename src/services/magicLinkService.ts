import { Strategy, VerifiedCallback } from 'passport-custom'
import User, { IUser } from '../models/userModel'
import UserService from './userService'
import MailerService from './mailerService'

class MagicLinkService extends Strategy {
  constructor() {
    super(async (req: any, done: VerifiedCallback) => {
      const email = req.body.email || process.env.AWS_VERIFIED_EMAIL
      if (!email) {
        return done(new Error('Email is required'))
      }
      try {
        let user: IUser | null = await User.findOne({ email })
        if (!user) {
          user = await UserService.createUser({ email })
        }
        await MailerService.sendMagicLink(user.email, 'http://localhost:3000/auth/magic-link')
        done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  }
}

export default MagicLinkService
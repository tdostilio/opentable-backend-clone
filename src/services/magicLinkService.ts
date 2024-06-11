import { Strategy, VerifiedCallback } from 'passport-custom'
import User, { IUser } from '../models/userModel'
import UserService from './userService'

class MagicLinkService extends Strategy {
  constructor() {
    // this is the magic link strategy after a user clicks the email link
    super(async (req: any, done: VerifiedCallback) => {
      // TODO - add token logic
      const email = req.body.email || req.query.email
      if (!email) {
        return done(new Error('Email is required'))
      }
      try {
        let user: IUser | null = await User.findOne({ email })
        if (!user) {
          user = await UserService.createUser({ email })
        }
        done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  }
}

export default MagicLinkService
import { Strategy } from 'passport-custom'
import User from '../models/userModel'
import UserService from './userService'
import MailerService from './mailerService'

class MagicLinkService extends Strategy {
  constructor() {
    super(async req => await this.authenticate(req))
  }

  async authenticate(req: any) {
    const email = req.body.email
    if (!email) {
      throw new Error('Email is required')
    }
    let user
    try {
      user = await User.findOne({ email })
      if (!user) {
        // if not found, create user
        user = await UserService.createUser({ email })
      }
    } catch (err) {
      throw err
    }
    try {
      await MailerService.sendMagicLink(email, 'http://localhost:3000/auth/magic-link')
    } catch (err: any) {
      throw new Error(err)
    }
    // send magic link
    // const magicLink = await MagicLinkService.createMagicLink(user)
  }
}

export default MagicLinkService
import { Strategy, VerifiedCallback } from 'passport-custom'
import User, { IUser } from '../models/userModel'
import UserService from './userService'
import MailerService from './mailerService'

class MagicLinkService extends Strategy {
  constructor() {
    super((req: any, done: VerifiedCallback) => {
      const email = req.body.email
      if (!email) {
        return done(new Error('Email is required'))
      }
      User.findOne({ email }, (err: any, user: IUser) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          // if not found, create user
          UserService.createUser({ email })
            .then(newUser => {
              user = newUser
              return MailerService.sendMagicLink(email, 'http://localhost:3000/auth/magic-link')
            })
            .then(() => {
              done(null, user)
            })
            .catch(err => {
              return done(err)
            })
        } else {
          MailerService.sendMagicLink(email, 'http://localhost:3000/auth/magic-link')
            .then(() => {
              done(null, user)
            })
            .catch(err => {
              return done(err)
            })
        }
      })
    })
  }
}

export default MagicLinkService
import UserService from './userService'
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20'
import { Profile } from 'passport'
import User from '../models/userModel'

class GoogleAuthService extends GoogleStrategy {
  constructor() {
    super(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/auth/google/callback',
        scope: ['email', 'profile']
      },
      async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        const { id, displayName, emails, name, photos } = profile
        const userData = {
          id,
          displayName,
          email: emails ? emails[0].value : undefined,
          firstName: name ? name.givenName : undefined,
          lastName: name ? name.familyName : undefined,
          picture: photos ? photos[0].value : undefined
        }
        const { email, firstName, lastName, picture } = userData
        let existingUser
        try {
          existingUser = await User.findOne({ email })
        } catch (err) {
          return done(err)
        }

        if (existingUser) {
          return done(undefined, existingUser)
        }
        // if not found, create user
        let user
        try {
          user = await UserService.createUser({ firstName, lastName, email, picture })
        } catch (error) {
          return done(error)
        }
        done(null, user)
      }
    )
  }
}


export default GoogleAuthService
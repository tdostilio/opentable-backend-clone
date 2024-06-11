import UserService from '../services/userService'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Profile } from 'passport'
import { VerifyCallback } from 'passport-google-oauth20'

import User from '../models/userModel'


interface GoogleProfile extends Profile {
  _json: {
    email: string | undefined,
    email_verified: boolean,
    name: string,
    picture: string,
    given_name: string,
    family_name: string
  }
  id: string
}

// using "any" because the type definition for GoogleStrategy is currently broken
class GoogleOAuthService extends GoogleStrategy {
  constructor() {
    super(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        // const { }
        // const { email, given_name, family_name, picture } = profile
        // lookup user by email
        let existingUser
        try {
          existingUser = await User.findOne({ email: profile.emails![0].value })
        } catch (err) {
          return done(err, undefined)
        }

        if (existingUser) {
          return done(undefined, existingUser)
        }
        // if not found, create user
        let user
        // try {
        //   user = await UserService.createUser({ firstName: given_name, lastName: family_name, email, avatar: picture })
        // } catch (error) {
        //   return done(error, null)
        // }
        done(null, user)
      }
    )
  }
}


export default GoogleOAuthService
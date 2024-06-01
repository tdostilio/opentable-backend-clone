import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import User from '../models/userModel'
import UserService from '../services/userService'
import { PassportStatic } from 'passport'

dotenv.config()

interface GoogleProfile {
  _json: {
    email: string,
    email_verified: boolean,
    name: string,
    picture: string,
    given_name: string,
    family_name: string
  }
  id: string
}

const setupPassport = (passport: PassportStatic) => {
  passport.use(
    // using 'any' as type definition for GoogleStrategy is currrently broken
    new (GoogleStrategy as any)(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: (error: any, user?: any) => void) => {
        const { email, given_name, family_name, picture } = profile._json
        // what do I want to do here? lookup user by email, if not found, create user
        let existingUser = await User.findOne({ email })

        if (existingUser) {
          return done(null, existingUser)
        }
        let user
        try {
          await UserService.createGoogleUser({ firstName: given_name, lastName: family_name, email, avatar: picture })
        } catch (error) {
          return done(error, null)
        }
        done(null, user)
      }
    )
  )

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
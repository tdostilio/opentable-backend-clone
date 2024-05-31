import User, { IUser } from '../models/userModel'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User({ googleId: profile.id }).save()
      done(null, user)
    }
  )
)

export class UserService {
  async createUser(firstName: string, lastName: string, email: string, password: string) {
    const user = new User({ firstName, lastName, email, password })
    await user.save()
    return user
  }

  async updateUser(id: string, updates: Partial<IUser>) {
    const user = await User.findByIdAndUpdate(id, updates, { new: true })
    return user
  }

  // Add other methods as needed
}

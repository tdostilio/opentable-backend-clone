import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string,
  providers: {
    googleId?: string,
    githubId?: string,
    magicLinkId?: string
  },
  name?: string,
  avatar?: string
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  providers: {
    googleId: String,
    githubId: String,
    magicLinkId: String
  },
  name: String,
  avatar: String,
  // other fields as needed
})

export default mongoose.model<IUser>('User', UserSchema)
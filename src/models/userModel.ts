import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId
  firstName: string,
  lastName: string,
  email: string,
  providers: {
    googleId?: string,
    githubId?: string,
    magicLinkId?: string
  },
  picture?: string
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  providers: {
    googleId: String,
    githubId: String,
    magicLinkId: String
  },
  picture: String,
  // Add other fields as needed
})

export default mongoose.model<IUser>('User', UserSchema)
import User, { IUser } from '../models/userModel'

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

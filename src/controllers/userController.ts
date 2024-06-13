import { Request, Response } from 'express'
import UserService from '../services/userService'

export class UserController {
  private userService: typeof UserService

  constructor(userService: typeof UserService) {
    this.userService = userService
  }

  async createUser(req: Request, res: Response) {
    const { firstName, lastName, email } = req.body
    const user = await this.userService.createUser(req.body)
    res.status(201).json(user)
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params
    const updates = req.body
    const user = await this.userService.updateUser(id, updates)
    res.json(user)
  }

}
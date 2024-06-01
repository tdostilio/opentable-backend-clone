// routes/userRoutes.ts
import express from 'express'
import { UserController } from '../controllers/userController'
import UserService from '../services/userService'

const router = express.Router()
const userController = new UserController(UserService)

router.post('/users', (req, res) => userController.createUser(req, res))
router.put('/users/:id', (req, res) => userController.updateUser(req, res))

export default router
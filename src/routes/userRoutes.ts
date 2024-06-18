import express from 'express'
import { UserController } from '../controllers/userController'
import UserService from '../services/userService'
import passport from 'passport'

const router = express.Router()
const userController = new UserController(UserService)

// not used in this example, but here's how you would use the controller
// router.post('/users', (req, res) => userController.createUser(req, res))
router.get('/users/:id', passport.authenticate('session'), (req, res) => userController.getUser(req, res))

export default router
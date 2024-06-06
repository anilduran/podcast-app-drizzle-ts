import express from 'express'
import UsersController from '../controllers/users.controller'
import auth from '../middlewares/auth'

const router = express.Router()

router.get('/', auth, UsersController.getUsers)

router.get('/:id', auth, UsersController.getUserByID)

router.post('/', auth, UsersController.createUser)

router.patch('/', auth, UsersController.updateUser)

router.patch('/:id', auth, UsersController.updateUser)

router.delete('/', auth, UsersController.deleteUser)

export default router
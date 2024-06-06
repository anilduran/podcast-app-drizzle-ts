import express from 'express'
import AuthController from '../controllers/auth.controller'

const router = express.Router()

router.post('/sign-in', AuthController.signIn)

router.post('/sign-up', AuthController.signUp)


export default router
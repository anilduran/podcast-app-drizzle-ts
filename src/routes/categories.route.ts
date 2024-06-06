import express from 'express'
import CategoriesController from '../controllers/categories.controller'
import auth from '../middlewares/auth'

const router = express.Router()

router.get('/', auth, CategoriesController.getCategories)

router.get('/:id', auth, CategoriesController.getCategoryById)

router.post('/', auth, CategoriesController.createCategory)

router.patch('/:id', auth, CategoriesController.updateCategory)

router.delete('/:id', auth, CategoriesController.deleteCategory)

export default router
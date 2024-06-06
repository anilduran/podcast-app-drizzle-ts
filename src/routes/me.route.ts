import express from 'express'
import auth from '../middlewares/auth'
import MeController from '../controllers/me.controller'

const router = express.Router()

router.get('/', auth, MeController.getMyCredentials)

router.patch('/', auth, MeController.updateMyCredentials)

router.get('/playlists', auth, MeController.getMyPlaylists)

router.get('/podcast-lists', auth, MeController.getMyPodcastLists)

router.get('/podcasts', auth, MeController.getMyPodcasts)

router.get('/listening-history', auth, MeController.getMyListeningHistory)

export default router
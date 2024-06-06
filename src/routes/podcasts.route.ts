import express from 'express'
import PodcastsController from '../controllers/podcasts.controller'
import auth from '../middlewares/auth'

const router = express.Router()

router.get('/', auth, PodcastsController.getPodcasts)

router.get('/:id', auth, PodcastsController.getPodcastByID)

router.post('/', auth, PodcastsController.createPodcast)

router.patch('/:id', auth, PodcastsController.updatePodcast)

router.delete('/:id', auth, PodcastsController.deletePodcast)

router.post('/:id/like', auth, PodcastsController.likePodcast)

router.post('/:id/unlike', auth, PodcastsController.unlikePodcast)

router.get('/:id/comments', auth, PodcastsController.getComments)

router.post('/:id/comments', auth, PodcastsController.createComment)

router.patch('/:id/comments/:commentId', auth, PodcastsController.updateComment)

router.delete('/:id/comments/:commentId', auth, PodcastsController.deleteComment)

export default router
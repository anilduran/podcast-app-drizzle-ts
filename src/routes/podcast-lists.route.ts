import express from 'express'
import PodcastListsController from '../controllers/podcastLists.controller'
import auth from '../middlewares/auth'

const router = express.Router()

router.get('/', auth, PodcastListsController.getPodcastLists)

router.get('/:id', auth, PodcastListsController.getPodcastListByID)

router.post('/', auth, PodcastListsController.createPodcastList)

router.patch('/:id', auth, PodcastListsController.updatePodcastList)

router.delete('/:id', auth, PodcastListsController.deletePodcastList)

router.get('/:id/podcasts', auth, PodcastListsController.getPodcasts)

router.post('/:id/podcasts/:podcastId', auth, PodcastListsController.addPodcastToPlaylist)

router.delete('/:id/podcasts/:podcastId', auth, PodcastListsController.removePodcastFromPlaylist)

router.get('/:id/comments', auth, PodcastListsController.getComments)

router.post('/:id/comments', auth, PodcastListsController.createComment)

router.patch('/:id/comments/:commentId', auth, PodcastListsController.updateComment)

router.delete('/:id/comments/:commentId', auth, PodcastListsController.deleteComment)

export default router
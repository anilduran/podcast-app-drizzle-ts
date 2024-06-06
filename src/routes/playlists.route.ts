import express from 'express'
import PlaylistsController from '../controllers/playlists.controller'
import auth from '../middlewares/auth'

const router = express.Router()

router.get('/', auth, PlaylistsController.getPlaylistByID)

router.get('/:id', auth, PlaylistsController.getPlaylistByID)

router.post('/', auth, PlaylistsController.createPlaylist)

router.patch('/:id', auth, PlaylistsController.updatePlaylist)

router.delete('/:id', auth, PlaylistsController.deletePlaylist)

router.get('/:id/podcasts', auth, PlaylistsController.getPodcasts)

export default router
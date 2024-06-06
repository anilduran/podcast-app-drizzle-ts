import db from './drizzle/db'
import express, { NextFunction, Request, Response } from 'express'

import authRoutes from './routes/auth.route'
import meRoutes from './routes/me.route'
import podcastListsRoutes from './routes/podcast-lists.route'
import podcastsRoutes from './routes/podcasts.route'
import playlistsRoutes from './routes/playlists.route'
import categoriesRoutes from './routes/categories.route'
import usersRoutes from './routes/users.route'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

async function bootstrap() {

    const app = express()

    // morgan('dev')

    app.use(cors())

    app.use(helmet())
    
    app.use(bodyParser.json())

    app.use('/auth', authRoutes)
    app.use('/me', meRoutes)
    app.use('/podcast-lists', podcastListsRoutes)
    app.use('/podcasts', podcastsRoutes)
    app.use('/playlists', playlistsRoutes)
    app.use('/categories', categoriesRoutes)
    app.use('/users', usersRoutes)

    app.get('/health', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: 'healthy' })
    })


    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

        console.log(err)

        res.status(500).json({ name: err.name, message: err.message })
    })

    
    app.listen(3000, () => {
        console.log('app is running on port 3000')
    })

}

bootstrap()
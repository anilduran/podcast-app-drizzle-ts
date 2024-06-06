import { NextFunction, Response } from "express";
import db from "../drizzle/db";
import { and, eq } from "drizzle-orm";
import { playlistPodcasts, playlists, podcasts } from "../drizzle/schema";

export default class PlaylistsController {

    static async getPlaylists(req: any, res: Response, next: NextFunction) {
        try {

            const playlists = await db.query.playlists.findMany()

            res.status(200).json(playlists)

        } catch(error) {
            next(error)
        }
    }
    
    static async getPlaylistByID(req: any, res: Response, next: NextFunction) {
        try {

            const playlist = await db.query.playlists.findFirst({ where: eq(playlists.id, req.params.id) })

            res.status(200).json(playlist)

        } catch(error) {
            next(error)
        }
    }
    
    static async createPlaylist(req: any, res: Response, next: NextFunction) {
        try {

            const playlist = await db.insert(playlists).values({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                creatorId: req.user.id
            }).returning()

            res.status(201).json(playlist)

        } catch(error) {
            next(error)
        }
    }
    
    static async updatePlaylist(req: any, res: Response, next: NextFunction) {
        try {

            const playlist = await db.update(playlists).set({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            }).where(eq(playlists.id, req.params.id)).returning()

            res.status(200).json(playlist)

        } catch(error) {
            next(error)
        }
    }
    
    static async deletePlaylist(req: any, res: Response, next: NextFunction) {
        try {

            const playlist = await db.delete(playlists).returning()

            res.status(200).json(playlist)

        } catch(error) {
            next(error)
        }
    }

    static async getPodcasts(req: any, res: Response, next: NextFunction) {
        try {

            const podcasts = await db.query.playlistPodcasts.findMany({
                where: eq(playlistPodcasts.playlistId, req.params.id),
                with: {
                    podcast: true
                }
            })

            res.status(200).json(podcasts)

        } catch(error) {
            next(error)
        }
    }

    static async addPodcastToPlaylist(req: any, res: Response, next: NextFunction) {
        try {

            const result = await db.insert(playlistPodcasts).values({
                playlistId: req.params.id,
                podcastId: req.params.podcastId
            }).returning()

            const podcast = await db.query.podcasts.findFirst({
                where: eq(podcasts.id, result[0].podcastId!)
            })

            res.status(201).json(podcast)

        } catch(error) {
            next(error)
        }
    }

    static async removePodcastFromPlaylist(req: any, res: Response, next: NextFunction) {
        try {

            const result = await db.delete(playlistPodcasts).where(
                and(eq(playlistPodcasts.playlistId, req.params.id), eq(playlistPodcasts.podcastId, req.params.podcastId))
            ).returning()

            const podcast = await db.query.podcasts.findFirst({
                where: eq(podcasts.id, result[0].podcastId!)
            })

            res.status(200).json(podcast)

        } catch(error) {
            next(error)
        }
    }


}
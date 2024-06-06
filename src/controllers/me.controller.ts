import { NextFunction, Response } from "express";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { playlists,  podcastLists, podcasts, users } from "../drizzle/schema";

export default class MeController {
 
    static async getMyCredentials(req: any, res: Response, next: NextFunction) {
        try {

            const user = await db.query.users.findFirst({ where: eq(users.id, req.user.id) })

            res.status(200).json(user)

        } catch(error) {
            next(error)
        }
    }
    
    static async updateMyCredentials(req: any, res: Response, next: NextFunction) {
        try {

        } catch(error) {
            next(error)
        }
    }
    
    static async getMyPodcastLists(req: any, res: Response, next: NextFunction) {
        try {

            const myPodcastLists = await db.query.podcastLists.findMany({ where: eq(podcastLists.creatorId, req.user.id) })

            res.status(200).json(myPodcastLists)

        } catch(error) {
            next(error)
        }
    }
    
    static async getMyPodcasts(req: any, res: Response, next: NextFunction) {
        try {

            const myPodcasts = await db.query.podcasts.findMany({ where: eq(podcasts.creatorId, req.user.id) })

            res.status(200).json(myPodcasts)

        } catch(error) {
            next(error)
        }
    }
    
    static async getMyPlaylists(req: any, res: Response, next: NextFunction) {
        try {

            const myPlaylists = await db.query.playlists.findMany({ where: eq(playlists.creatorId, req.user.id) })

            res.status(200).json(myPlaylists)

        } catch(error) {
            next(error)
        }
    }

    static async getMyListeningHistory(req: any, res: Response, next: NextFunction) {
        try {

        } catch(error) {
            next(error)
        }
    }



}
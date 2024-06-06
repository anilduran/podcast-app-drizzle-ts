import { NextFunction, Response } from "express";
import db from "../drizzle/db";
import { and, eq } from "drizzle-orm";
import { podcastComments, podcastLikes, podcasts } from "../drizzle/schema";

export default class PodcastsController {
 
    static async getPodcasts(req: any, res: Response, next: NextFunction) {
        try {

            const podcasts = await db.query.podcasts.findMany()

            res.status(200).json(podcasts)

        } catch(error) {
            next(error)
        }
    }

    static async getPodcastByID(req: any, res: Response, next: NextFunction) {
        try {
            
            const podcast = await db.query.podcasts.findFirst({ where: eq(podcasts.id, req.params.id) })

            res.status(200).json(podcast)

        } catch(error) {
            next(error)
        }
    }

    static async createPodcast(req: any, res: Response, next: NextFunction) {
        try {

            const podcast = await db.insert(podcasts).values({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                creatorId: req.users.id,
                podcastUrl: req.body.podcastUrl,
                isPublic: req.body.isPublic 
            }).returning()

            res.status(201).json(podcast)

        } catch(error) {
            next(error)
        }
    }

    static async updatePodcast(req: any, res: Response, next: NextFunction) {
        try {

            const podcast = await db.update(podcasts).set({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                podcastUrl: req.body.imageUrl,
                isPublic: req.body.isPublic
            }).where(eq(podcasts.id, req.params.id)).returning()

            res.status(200).json(podcast)

        } catch(error) {
            next(error)
        }
    }

    static async deletePodcast(req: any, res: Response, next: NextFunction) {
        try {

            const podcast = await db.delete(podcasts).where(eq(podcasts.id, req.params.id)).returning()

            res.status(200).json(podcast)

        } catch(error) {
            next(error)
        }
    }

    static async likePodcast(req: any, res: Response, next: NextFunction) {
        try {
            
            const podcastLike = await db.insert(podcastLikes).values({ podcastId: req.params.id, userId: req.user.id }).returning()

            res.status(201).json(podcastLike)

        } catch(error) {
            next(error)
        }
    }

    static async unlikePodcast(req: any, res: Response, next: NextFunction) {
        try {

            const podcastLike = await db.delete(podcastLikes).where(and(eq(podcastLikes.podcastId, req.params.id), eq(podcastLikes.userId, req.user.id))).returning()

            res.status(200).json(podcastLike)

        } catch(error) {
            next(error)
        }
    }

    static async getComments(req: any, res: Response, next: NextFunction) {
        try {

            const comments = db.query.podcastComments.findMany()

            res.status(200).json(comments)

        } catch(error) {
            next(error)
        }
    }
    static async createComment(req: any, res: Response, next: NextFunction) {
        try {

            const result = await db.insert(podcastComments).values({
                content: req.body.content,
                podcastId: req.params.podcastId,
                userId: req.user.id
            }).returning()

            res.status(201).json(result)

        } catch(error) {
            next(error)
        }
    }
    static async updateComment(req: any, res: Response, next: NextFunction) {
        try {

            const result = await db.update(podcastComments).set({
                content: req.body.content
            }).where(eq(podcastComments.id, req.params.podcastId)).returning()
    
            res.status(200).json(result[0])

        } catch(error) {
            next(error)
        }
    }
    static async deleteComment(req: any, res: Response, next: NextFunction) {
        try {

            const result = await db.delete(podcastComments).where(eq(podcastComments.id, req.params.podcastId)).returning()

            res.status(200).json(result[0])

        } catch(error) {
            next(error)
        }
    }


}
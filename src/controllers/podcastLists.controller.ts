import { NextFunction, Response } from "express";
import db from "../drizzle/db";
import { and, eq } from "drizzle-orm";
import { podcastListComments, podcastListPodcasts, podcastLists, podcasts } from "../drizzle/schema";
import { z } from "zod";

export default class PodcastListsController {

    static async getPodcastLists(req: any, res: Response, next: NextFunction) {
        try {

            const podcastLists = await db.query.podcastLists.findMany()

            res.status(200).json(podcastLists)

        } catch(error) {
            next(error)
        }
    }

    static async getPodcastListByID(req: any, res: Response, next: NextFunction) {
        try {

            const podcastList = await db.query.podcastLists.findFirst({ where: eq(podcastLists.id, req.params.id) })

            res.status(200).json(podcastList)

        } catch(error) {
            next(error)
        }
    }
    
    static async createPodcastList(req: any, res: Response, next: NextFunction) {
        try {

            const podcastList = await db.insert(podcastLists).values({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: req.body.isPublic,
                creatorId: req.user.id
            }).returning()

            res.status(200).json(podcastList)

        } catch(error) {
            next(error)
        }
    }
    
    static async updatePodcastList(req: any, res: Response, next: NextFunction) {
        try {

            const podcastList = await db.update(podcastLists).set({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: req.body.isPublic   
            }).where(eq(podcastLists.id, req.params.id)).returning()
            
            res.status(200).json(podcastList)

        } catch(error) {
            next(error)
        }
    }
    
    static async deletePodcastList(req: any, res: Response, next: NextFunction) {
        try {

            const podcastList = await db.delete(podcastLists).where(eq(podcastLists.id, req.params.id)).returning()

            res.status(200).json(podcastList)

        } catch(error) {
            next(error)
        }
    }

    static async addPodcastToPlaylist(req: any, res: Response, next: NextFunction) {
        try {

            const result = await db.insert(podcastListPodcasts).values({
                podcastId: req.params.podcastId,
                podcastListId: req.params.id
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

            const result = await db.delete(podcastListPodcasts).where(
                and(eq(podcastListPodcasts.podcastListId, req.params.id), eq(podcastListPodcasts.podcastId, req.params.podcastId))
            ).returning()

            res.status(200).json(result[0])

        } catch(error) {
            next(error)
        }
    }

    static async getPodcasts(req: any, res: Response, next: NextFunction) {
        try {

            const podcasts = await db.query.podcastListPodcasts.findMany({
                where: eq(podcastListPodcasts.podcastListId, req.params.id),
                with: {
                    podcasts: true
                }
            })

            res.status(200).json(podcasts)

        } catch(error) {
            next(error)
        }
    }

    static async getComments(req: any, res: Response, next: NextFunction) {
        try {

            const comments = await db.query.podcastListComments.findMany({
                where: eq(podcastListComments.podcastListId, req.params.id)
            })

            res.status(200).json(comments)

        } catch(error) {
            next(error)
        }
    }
    
    static async createComment(req: any, res: Response, next: NextFunction) {
        try {

            const CommentSchema = z.object({
                content: z.string()
            })

            const parsedSchema = CommentSchema.parse(req.body)

            const result = await db.insert(podcastListComments).values({
                content: parsedSchema.content,
                userId: req.user.id,
                podcastListId: req.params.id
            }).returning()

            res.status(201).json(result)

        } catch(error) {
            next(error)
        }
    }
    
    static async updateComment(req: any, res: Response, next: NextFunction) {
        try {

            const CommentSchema = z.object({
                content: z.string()
            })

            const parsedSchema = CommentSchema.parse(req.body)

            const result = await db.update(podcastListComments).set({
                content: parsedSchema.content
            }).where(eq(podcastListComments.id, req.params.commentId)).returning()

            res.status(200).json(result[0])
            
        } catch(error) {
            next(error)
        }
    }
    
    static async deleteComment(req: any, res: Response, next: NextFunction) {
        try {

            const result = await db.delete(podcastListComments).where(eq(podcastListComments.id, req.params.podcastListId)).returning()

            const comment = result[0]

            res.status(200).json(comment)

        } catch(error) {
            next(error)
        }
    }




}
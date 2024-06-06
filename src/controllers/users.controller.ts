import { NextFunction, Response } from "express";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema";


export default class UsersController {


    static async getUsers(req: any, res: Response, next: NextFunction) {
        try {
            
            const users = await db.query.users.findMany({
                columns: {
                    password: false
                }
            })

            res.status(200).json(users)

        } catch(error) {
            next(error)
        }
    }
    
    static async getUserByID(req: any, res: Response, next: NextFunction) {
        try {

            const user = await db.query.users.findFirst({
                where: eq(users.id, req.params.id),
                columns: {
                    password: false
                }
            })

            res.status(200).json(user)

        } catch(error) {
            next(error)
        }
    }
    
    static async createUser(req: any, res: Response, next: NextFunction) {
        try {

            const user = await db.insert(users).values({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePhotoUrl: req.body.profilePhotoUrl
            }).returning()  

            res.status(201).json(user)

        } catch(error) {
            next(error)
        }
    }
    
    static async updateUser(req: any, res: Response, next: NextFunction) {
        try {
            
            const user = await db.update(users).set({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePhotoUrl: req.body.profilePhotoUrl
            }).where(eq(users.id, req.params.id)).returning()

            res.status(200).json(user)

        } catch(error) {
            next(error)
        }
    }
    static async deleteUser(req: any, res: Response, next: NextFunction) {
        try {

            const user = await db.delete(users).where(eq(users.id, req.params.id)).returning()

            res.status(200).json(user)

        } catch(error) {
            next(error)
        }
    }

    





}
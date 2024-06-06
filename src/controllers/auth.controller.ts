import { NextFunction, Response } from "express";
import { z } from "zod";
import db from "../drizzle/db";
import { eq, or } from "drizzle-orm";
import { users } from "../drizzle/schema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthController {


    static async signIn(req: any, res: Response, next: NextFunction) {
        try {

            const user = await db.query.users.findFirst({
                where: eq(users.email, req.body.email)
            })

            if (!user) {
                return res.status(400).json({
                    message: 'User does not exist!'
                })
            }
            
            if (!(await bcrypt.compare(req.body.user, user.password))) {
                return res.status(400).json({
                    message: 'Wrong credentials!'
                })
            }

            const token = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email
            }, process.env.JWT_SECRET as string, {
                expiresIn: '1d'
            })

            res.status(200).json({
                token,
                expiresIn: '1d'
            })


        } catch(error) {
            next(error)
        } 
    }

    static async signUp(req: any, res: Response, next: NextFunction) {
        try {
            
            const existingUser = await db.query.users.findFirst({
                where: or(eq(users.username, req.body.username), eq(users.email, req.body.email))
            })
            
            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists!'
                })
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const result = await db.insert(users).values({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            }).returning()

            const user = result[0]
            
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email
            }, process.env.JWT_SECRET as string, {
                expiresIn: '1d'
            })

            res.status(201).json({
                token,
                expiresIn: '1d'
            })

        } catch(error) {
            next(error)
        }
    }
}
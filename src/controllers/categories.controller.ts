import { NextFunction, Response } from "express";
import db from "../drizzle/db";
import { categories } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export default class CategoriesController {
 

    static async getCategories(req: any, res: Response, next: NextFunction) {
        try {

            const categories = await db.query.categories.findMany()
            
            res.status(200).json(categories)

        } catch(error) {
            next(error)
        }
    }


    static async getCategoryById(req: any, res: Response, next: NextFunction) {
        try {

            const category = await db.query.categories.findFirst({
                where: (categories, { eq }) => eq(categories.id, req.params.id)
            })

            res.status(200).json(category)

        } catch(error) {
            next(error)
        }
    }

    static async createCategory(req: any, res: Response, next: NextFunction) {
        try {

            const category = await db.insert(categories).values({ name: req.body.name }).returning()

            res.status(201).json(category)

        } catch(error) {
            next(error)
        }
    }

    static async updateCategory(req: any, res: Response, next: NextFunction) {
        try {

            const category = await db.update(categories).set({ name: req.body.name }).where(eq(categories.id, req.params.id)).returning()

            res.status(200).json(category)

        } catch(error) {
            next(error)
        }
    }

    static async deleteCategory(req: any, res: Response, next: NextFunction) {
        try {

            const category = await db.delete(categories).where(eq(categories.id, req.params.id)).returning()

            res.status(200).json(category)

        } catch(error) {
            next(error)
        }
    }

    
    
}
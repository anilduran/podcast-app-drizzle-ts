import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'

const auth = (req: any, res: Response, next: NextFunction) => {

    const token = req.headers.get('authorization')

    if (!token) {
        return res.status(400).json({
            message: 'Token not found!'
        })
    }

    const user = jwt.verify(token, process.env.JWT_SECRET as string)

    req.user = user

}

export default auth

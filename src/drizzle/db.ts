import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js/driver'
import * as schema from './schema'
import dotenv from 'dotenv'


dotenv.config()

const queryClient = postgres(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`, { max: 1 })

const db = drizzle(queryClient, { schema })

export default db
import postgres from "postgres";
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { drizzle } from "drizzle-orm/postgres-js/driver";
import dotenv from 'dotenv'

dotenv.config()

const migrationClient = postgres(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`, { max: 1 })

async function main() {

    await migrate(drizzle(migrationClient), {
        migrationsFolder: './src/drizzle/migrations'
    })

    await migrationClient.end()

}

main()
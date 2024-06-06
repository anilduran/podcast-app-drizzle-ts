import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
       user: process.env.POSTGRES_USER as string,
       password: process.env.POSTGRES_PASSWORD as string,
       host: process.env.POSTGRES_HOST as string,
       port: 5432,
       database: process.env.POSTGRES_DATABASE as string,
       ssl: false  
    },
    strict: true,
    verbose: true

})
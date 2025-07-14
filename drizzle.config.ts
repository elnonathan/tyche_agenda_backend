import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
	out: './drizzle',
	schema: './src/database/database.model.ts',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL as string,
		authToken: process.env.TURSO_AUTH_TOKEN as string,
	},
})

// RUN MIGRATIONS: npx drizzle-kit push

import { drizzle } from 'drizzle-orm/libsql'
import { Client, createClient } from '@libsql/client'
import { LibSQLDatabase } from 'drizzle-orm/libsql/driver-core'

const CONCURRENT_REQUESTS: number = 10 as const

const turso: Client = createClient({
	url: process.env.TURSO_DATABASE_URL as string,
	authToken: process.env.TURSO_AUTH_TOKEN as string,
	//encryptionKey: process.env.TURSO_ENCRYPTION_KEY as string,
	concurrency: CONCURRENT_REQUESTS,
})

export const database: LibSQLDatabase = drizzle(turso)

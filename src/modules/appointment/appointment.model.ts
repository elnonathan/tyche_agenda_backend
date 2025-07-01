import {
	integer,
	real,
	sqliteTable,
	SQLiteTable,
	text,
} from 'drizzle-orm/sqlite-core'
import { person } from '@/modules/person/person.model'
import {
	MAX_APPOINTMENT_DATE_LENGTH,
	MAX_APPOINTMENT_DESCRIPTION_LENGTH,
	MAX_APPOINTMENT_TITLE_LENGTH,
	MAX_APPOINTMENT_URL_LENGTH,
} from '@/modules/appointment/appointment.constants'

export const appointment: SQLiteTable = sqliteTable('APPOINTMENT', {
	id: integer().notNull().primaryKey({ autoIncrement: true }),
	title: text({ length: MAX_APPOINTMENT_TITLE_LENGTH }).notNull(),
	description: text({ length: MAX_APPOINTMENT_DESCRIPTION_LENGTH }),
	duration: integer().notNull(),
	date: text({ length: MAX_APPOINTMENT_DATE_LENGTH }).notNull(),
	client_id: integer()
		.notNull()
		// @ts-expect-error : schema id property do exist
		.references(() => person.id),
	provider_id: integer()
		.notNull()
		// @ts-expect-error : schema id property do exist
		.references(() => person.id),
	url: text({ length: MAX_APPOINTMENT_URL_LENGTH }),
	origin_latitude: real(),
	origin_longitude: real(),
	destination_latitude: real(),
	destination_longitude: real(),
})

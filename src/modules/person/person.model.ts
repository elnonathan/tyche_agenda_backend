import {
	integer,
	sqliteTable,
	SQLiteTable,
	text,
} from 'drizzle-orm/sqlite-core'
import {
	MAX_EMAIL_LENGTH,
	MAX_PERSON_FIRST_NAME_LENGTH,
	MAX_PERSON_LAST_NAME_LENGTH,
} from '@/modules/person/person.constants'

export const person: SQLiteTable = sqliteTable('PERSON', {
	id: integer({ mode: 'number' })
		.notNull()
		.primaryKey({ autoIncrement: true }),
	first_name: text({ length: MAX_PERSON_FIRST_NAME_LENGTH }).notNull(),
	last_name: text({ length: MAX_PERSON_LAST_NAME_LENGTH }).notNull(),
	phone: integer({ mode: 'number' }).notNull(),
	email: text({ length: MAX_EMAIL_LENGTH }).notNull(),
})

/*
export const person: SQLiteTable = sqliteTable('PERSON', {
	id: integer({ mode: 'number' })
		.notNull()
		.primaryKey({ autoIncrement: true }),
	first_name: text().notNull(),
	last_name: text().notNull(),
	phone: integer({ mode: 'number' }).notNull(),
	email: text(),
})

export const fiscal: SQLiteTable = sqliteTable('FISCAL', {
	rfc: text().notNull().unique().primaryKey(),
	id_person: integer('id_person', { mode: 'number' })
		.notNull()
		// @ts-expect-error : schema id property do exist
		.references(() => person.id, { onDelete: 'cascade' }),
	regime: text().notNull(),
	preferred_usage: text().notNull(),
})

export const facility: SQLiteTable = sqliteTable('FACILITY', {
	id_person: integer('id_person', { mode: 'number' })
		.notNull()
		// @ts-expect-error : schema id property do exist
		.references(() => person.id, { onDelete: 'cascade' }),
	address: text().notNull(),
})

export const availability: SQLiteTable = sqliteTable('AVAILABILITY', {
	id_person: integer('id_person', { mode: 'number' })
		.notNull()
		// @ts-expect-error : schema id property do exist
		.references(() => person.id, { onDelete: 'cascade' }),
	start_year: integer('start_year'),
	start_month: integer('start_month'),
	start_day: integer('start_day'),
	start_hour: integer('start_hour'),
	start_minute: integer('start_minute'),
	end_year: integer('end_year'),
	end_month: integer('end_month'),
	end_day: integer('end_day'),
	end_hour: integer('end_hour'),
	end_minute: integer('end_minute'),
})

const person_fiscal_data: Relations = relations(person, ({ one }) => ({
	fiscal: one(fiscal, {
		// @ts-expect-error : schema id property do exist
		fields: [person.id],
		// @ts-expect-error : schema id_person property do exist
		references: fiscal.id_person,
	}),
}))

const person_facility: Relations = relations(person, ({ one }) => ({
	facility: one(facility, {
		// @ts-expect-error : schema id property do exist
		fields: [person.id],
		// @ts-expect-error : schema id_person property do exist
		references: facility.id_person,
	}),
}))

const person_availability: Relations = relations(person, ({ many }) => ({
	availability: many(availability),
}))
*/

import {
	Person,
	PersonFilter,
	PersonSchema,
} from '@/modules/person/person.schema'
import { database } from '@/database/database.client'
import { person } from '@/modules/person/person.model'
import { BinaryOperator, eq, like, SQL } from 'drizzle-orm'
import { Pagination } from '@/database/database.schema'
import { COMMON_NUMBERS } from '@/constants'
import { DEFAULT_APPOINTMENT_LIST_LIMIT } from '@/modules/appointment/appointment.constants'
import { transformPersonFromDB } from '@/modules/person/person.helpers'

const list = async (
	{
		limit = DEFAULT_APPOINTMENT_LIST_LIMIT,
		offset = COMMON_NUMBERS.ZERO,
	}: Pagination = {
		limit: DEFAULT_APPOINTMENT_LIST_LIMIT,
		offset: COMMON_NUMBERS.ZERO,
	}
): Promise<PersonSchema[]> =>
	((await database
		.select()
		.from(person)
		.limit(Number(limit))
		.offset(Number(offset))) as PersonSchema[]) || []

const find = async (
	condition: SQL<BinaryOperator>,
	{ limit, offset }: Pagination = {
		limit: DEFAULT_APPOINTMENT_LIST_LIMIT,
		offset: COMMON_NUMBERS.ZERO,
	}
): Promise<PersonSchema[]> =>
	((await database
		.select()
		.from(person)
		.limit(Number(limit))
		.offset(Number(offset))
		.where(condition)) as PersonSchema[]) || []

const filterPersonById = async (
	{ id }: Pick<PersonSchema, 'id'>,
	pagination: Pagination = {
		limit: COMMON_NUMBERS.ONE,
		offset: COMMON_NUMBERS.ZERO,
	}
): Promise<PersonSchema[]> =>
	// @ts-expect-error : schema id property do exist
	await find(eq(person.id, id), pagination) // NO "CONVERSION" FROM DB SCHEMA REQUIRED

const filterPersonByEmail = async (
	{ email }: Pick<PersonSchema, 'email'>,
	pagination?: Pagination
): Promise<PersonSchema[]> =>
	// @ts-expect-error : schema email property do exist
	await find(like(person.email, `${email}%`), pagination) // NO "CONVERSION" FROM DB SCHEMA REQUIRED

const filterPersonByPhone = async (
	{ phone }: Pick<PersonSchema, 'phone'>,
	pagination?: Pagination
): Promise<PersonSchema[]> =>
	// @ts-expect-error : schema phone property do exist
	await find(like(person.phone, `%${phone}%`), pagination) // NO "CONVERSION" FROM DB SCHEMA REQUIRED

const filterPerson = async (
	{ email, phone }: Pick<PersonSchema, 'email' | 'phone'>,
	pagination?: Pagination
): Promise<PersonSchema[]> => {
	let people: PersonSchema[] = []

	if (email) people = await filterPersonByEmail({ email }, pagination)
	if (phone) people = await filterPersonByPhone({ phone }, pagination)

	return people
}

export const getPerson = async (
	{ id }: Pick<Person, 'id'> = {} as Person
): Promise<PersonSchema | null> => {
	if (!id) return null
	const [found]: Awaited<PersonSchema[]> = await filterPersonById({ id })
	return found || null
}

export const findPerson = async (
	person: PersonFilter = {} as Person
): Promise<PersonSchema | null> => {
	const pagination: Pagination = {
		limit: COMMON_NUMBERS.ONE,
		offset: COMMON_NUMBERS.ZERO,
	}

	const [found] = await filterPerson(person, pagination)
	if (!found) return null
	return transformPersonFromDB(found)
}

export const searchPeople = async (
	person: PersonFilter = {} as Person,
	pagination?: Pagination
): Promise<PersonSchema[]> => await filterPerson(person, pagination)

export const listPeople = async (
	pagination?: Pagination
): Promise<PersonSchema[]> => await list(pagination)

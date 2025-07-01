import { Response } from 'express'
import { CustomRequest } from '@/router/router.schema'
import { createPerson } from '@/modules/person/actions/person.create'
import {
	Person,
	PersonFilter,
	PersonSchema,
} from '@/modules/person/person.schema'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'
import { CustomError } from '@/errors/errors.utils'
import {
	findPerson,
	getPerson,
	listPeople,
	searchPeople,
} from '@/modules/person/actions/person.retrieve'
import { updatePerson } from '@/modules/person/actions/person.update'
import { transformPersonFromDB } from '@/modules/person/person.helpers'
import { Pagination } from '@/database/database.schema'

export const createPersonService = async (
	{ body }: CustomRequest,
	response: Response
): Promise<void> => {
	const person: Awaited<Person | null> = await createPerson(
		body as Person
	)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.CREATED as number).json(
		person
	)
}

export const getPersonService = async (
	{ params }: CustomRequest,
	response: Response
): Promise<void> => {
	const person: Awaited<PersonSchema | null> = await getPerson(
		params as Partial<Person>
	)

	if (!person)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'getPerson'
		)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		transformPersonFromDB(person)
	)
}

export const findPersonService = async (
	{ query }: CustomRequest,
	response: Response
): Promise<void> => {
	const person: Awaited<PersonSchema | null> = await findPerson(
		query as PersonFilter
	)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		transformPersonFromDB(person)
	)
}

export const searchPeopleService = async (
	{ query }: CustomRequest,
	response: Response
): Promise<void> => {
	const people: Awaited<PersonSchema[]> = await searchPeople(
		query as PersonFilter
	)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		people.map(transformPersonFromDB)
	)
}

export const listPeopleService = async (
	{ query }: CustomRequest,
	response: Response
): Promise<void> => {
	const people: Awaited<PersonSchema[]> = await listPeople(
		query as unknown as Pagination
	)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		people.map(transformPersonFromDB)
	)
}

export const updatePersonService = async (
	{ body, params }: CustomRequest,
	response: Response
): Promise<void> => {
	const person: Awaited<Person> = (await updatePerson({
		...params,
		...body,
	} as Person)) satisfies Person

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		person
	)
}

import { Person, PersonSchema } from '@/modules/person/person.schema'
import { database } from '@/database/database.client'
import { person } from '@/modules/person/person.model'
import { eq } from 'drizzle-orm'
import { CustomError } from '@/errors/errors.utils'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'
import { COMMON_NUMBERS } from '@/constants'
import { getPerson } from '@/modules/person/actions/person.retrieve'

export const updatePerson = async ({
	id,
	first_name,
	last_name,
	phone,
	email,
}: Person): Promise<Person> => {
	const found: PersonSchema | null = await getPerson({ id })

	if (!found)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'updatePerson'
		)

	const update: Omit<Person, 'id'> = {
		first_name,
		last_name,
		phone,
		email,
	}

	const { rowsAffected = COMMON_NUMBERS.ZERO } = await database
		.update(person)
		.set(update)
		// @ts-expect-error : schema id property do exist
		.where(eq(person.id, id))

	if (rowsAffected === COMMON_NUMBERS.ZERO)
		throw new CustomError(
			HTTP_CODE_NUMBER?.SATISFACTORY?.NO_CONTENT,
			'updatePerson'
		)

	return { ...found, ...update }
}

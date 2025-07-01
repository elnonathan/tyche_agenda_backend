import { Person, PersonSchema } from '@/modules/person/person.schema'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'
import { database } from '@/database/database.client'
import { person } from '@/modules/person/person.model'
import { COMMON_NUMBERS } from '@/constants'
import { CustomError } from '@/errors/errors.utils'
import { findPerson } from '@/modules/person/actions/person.retrieve'
import { transformPersonFromDB } from '@/modules/person/person.helpers'

export const createPerson = async ({
	first_name,
	last_name,
	phone,
	email,
}: Person): Promise<Person | null> => {
	const found: PersonSchema | null = await findPerson({ email, phone })

	if (found)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.CONFLICT,
			'createPerson'
		)

	const next: PersonSchema = {
		first_name,
		last_name,
		phone,
		email,
	} satisfies PersonSchema

	const { rowsAffected = COMMON_NUMBERS.ZERO } = await database
		.insert(person)
		.values(next)

	if (rowsAffected === COMMON_NUMBERS.ZERO)
		throw new CustomError(
			HTTP_CODE_NUMBER?.SATISFACTORY?.NO_CONTENT,
			'createPerson'
		)

	return transformPersonFromDB(next)
}

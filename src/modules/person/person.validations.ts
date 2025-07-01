import * as yup from 'yup'
import {
	MAX_EMAIL_LENGTH,
	MAX_PERSON_FIRST_NAME_LENGTH,
	MAX_PERSON_LAST_NAME_LENGTH,
	MAX_PHONE_LENGTH,
	MIN_EMAIL_LENGTH,
	MIN_PERSON_FIRST_NAME_LENGTH,
	MIN_PERSON_LAST_NAME_LENGTH,
	MIN_PHONE_LENGTH,
	MIN_SEARCH_EMAIL_LENGTH,
	MIN_SEARCH_PHONE_LENGTH,
} from '@/modules/person/person.constants'

export const person_schema = {
	id: yup.number(),
	first_name: yup
		.string()
		.min(MIN_PERSON_FIRST_NAME_LENGTH)
		.max(MAX_PERSON_FIRST_NAME_LENGTH)
		.required(),
	last_name: yup
		.string()
		.min(MIN_PERSON_LAST_NAME_LENGTH)
		.max(MAX_PERSON_LAST_NAME_LENGTH)
		.required(),
	email: yup
		.string()
		.min(MIN_EMAIL_LENGTH)
		.max(MAX_EMAIL_LENGTH)
		.required(),
	phone: yup
		.string()
		.min(MIN_PHONE_LENGTH)
		.max(MAX_PHONE_LENGTH)
		.required(),
}

export const hasPersonSchema = yup.object().shape(person_schema)

export const hasPersonFilterSchema = yup.object().shape({
	email: yup.string().min(MIN_SEARCH_EMAIL_LENGTH).max(MAX_EMAIL_LENGTH),
	phone: yup.string().min(MIN_SEARCH_PHONE_LENGTH).max(MAX_PHONE_LENGTH),
})

import * as yup from 'yup'
import {
	MAX_APPOINTMENT_DATE_LENGTH,
	MAX_APPOINTMENT_DESCRIPTION_LENGTH,
	MAX_APPOINTMENT_DURATION_LENGTH,
	MAX_APPOINTMENT_LATITUDE_LENGTH,
	MAX_APPOINTMENT_LONGITUDE_LENGTH,
	MAX_APPOINTMENT_TITLE_LENGTH,
	MAX_APPOINTMENT_URL_LENGTH,
	MIN_APPOINTMENT_DATE_LENGTH,
	MIN_APPOINTMENT_DURATION_LENGTH,
	MIN_APPOINTMENT_LATITUDE_LENGTH,
	MIN_APPOINTMENT_LONGITUDE_LENGTH,
	MIN_APPOINTMENT_TITLE_LENGTH,
	MIN_APPOINTMENT_URL_LENGTH,
} from '@/modules/appointment/appointment.constants'
import { person_schema } from '@/modules/person/person.validations'

export const appointment_location_schema = {
	latitude: yup
		.number()
		.min(MIN_APPOINTMENT_LATITUDE_LENGTH)
		.max(MAX_APPOINTMENT_LATITUDE_LENGTH)
		.required(),
	longitude: yup
		.number()
		.min(MIN_APPOINTMENT_LONGITUDE_LENGTH)
		.max(MAX_APPOINTMENT_LONGITUDE_LENGTH)
		.required(),
}

export const has_appointment_location_schema = yup
	.object()
	.shape(appointment_location_schema)

export const has_appointment_retrieve_schema = yup.object().shape({
	id: yup.number(),
	title: yup
		.string()
		.min(MIN_APPOINTMENT_TITLE_LENGTH)
		.max(MAX_APPOINTMENT_TITLE_LENGTH)
		.required(),
	description: yup.string().max(MAX_APPOINTMENT_DESCRIPTION_LENGTH),
	duration: yup
		.number()
		.min(MIN_APPOINTMENT_DURATION_LENGTH)
		.max(MAX_APPOINTMENT_DURATION_LENGTH)
		.required(),
	date: yup
		.string()
		.min(MIN_APPOINTMENT_DATE_LENGTH)
		.max(MAX_APPOINTMENT_DATE_LENGTH)
		.required(),
	client: yup.object().shape(person_schema),
	provider: yup.object().shape(person_schema),
	url: yup
		.string()
		.min(MIN_APPOINTMENT_URL_LENGTH)
		.max(MAX_APPOINTMENT_URL_LENGTH),
	origin: yup.object().shape(appointment_location_schema).nullable(),
	destination: yup.object().shape(appointment_location_schema).nullable(),
})

export const has_appointment_create_schema = yup.object().shape({
	id: yup.number(),
	title: yup
		.string()
		.min(MIN_APPOINTMENT_TITLE_LENGTH)
		.max(MAX_APPOINTMENT_TITLE_LENGTH)
		.required(),
	description: yup.string().max(MAX_APPOINTMENT_DESCRIPTION_LENGTH),
	duration: yup
		.number()
		.min(MIN_APPOINTMENT_DURATION_LENGTH)
		.max(MAX_APPOINTMENT_DURATION_LENGTH)
		.required(),
	date: yup
		.string()
		.min(MIN_APPOINTMENT_DATE_LENGTH)
		.max(MAX_APPOINTMENT_DATE_LENGTH)
		.required(),
	client: yup.object().shape({
		id: yup.number().required(),
	}),
	provider: yup.object().shape({
		id: yup.number().required(),
	}),
	url: yup
		.string()
		.min(MIN_APPOINTMENT_URL_LENGTH)
		.max(MAX_APPOINTMENT_URL_LENGTH),
	origin: yup.object().shape(appointment_location_schema).nullable(),
	destination: yup.object().shape(appointment_location_schema).nullable(),
})

export const has_appointment_update_schema = has_appointment_create_schema

export const has_appointment_filter_schema = yup.object().shape({
	title: yup
		.string()
		.min(MIN_APPOINTMENT_TITLE_LENGTH)
		.max(MAX_APPOINTMENT_TITLE_LENGTH),
	date: yup
		.string()
		.min(MIN_APPOINTMENT_DATE_LENGTH)
		.max(MAX_APPOINTMENT_DATE_LENGTH),
	client_id: yup.number().required(),
	provider_id: yup.number().required(),
	url: yup
		.string()
		.min(MIN_APPOINTMENT_URL_LENGTH)
		.max(MAX_APPOINTMENT_URL_LENGTH),
})

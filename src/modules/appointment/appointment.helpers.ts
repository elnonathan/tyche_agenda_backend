import {
	Appointment,
	AppointmentLocation,
	AppointmentSchema,
} from '@/modules/appointment/appointment.schema'
import { DateTime } from 'luxon'
import { getPerson } from '@/modules/person/actions/person.retrieve'
import { Person } from '@/modules/person/person.schema'
import { CustomError } from '@/errors/errors.utils'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'
import {
	has_appointment_location_schema,
	has_appointment_retrieve_schema,
} from '@/modules/appointment/appointment.validations'
import { isNumber } from '@/utils'

//latitude?: number | string | null,
//longitude?: number | string | null

type CouldBeCoordinates = {
	latitude?: number | string | null
	longitude?: number | string | null
}

const resolveAppointmentCoordinates = ({
	latitude,
	longitude,
}: CouldBeCoordinates): AppointmentLocation | null => {
	if (!isNumber(latitude) || !isNumber(longitude)) return null
	return has_appointment_location_schema.validateSync({
		latitude,
		longitude,
	})
}

export const transformAppointmentFromQuery = ({
	id,
	title,
	description,
	duration,
	date,
	client_id,
	provider_id,
	url,
	origin_latitude,
	origin_longitude,
	destination_latitude,
	destination_longitude,
}: AppointmentSchema): Partial<Appointment> => {
	if (!client_id || !provider_id)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.BAD_REQUEST,
			'transformAppointmentFromQuery'
		)

	const client: Pick<Person, 'id'> = {
		id: client_id,
	}

	const provider: Pick<Person, 'id'> = {
		id: provider_id,
	}

	const origin: AppointmentLocation | null =
		resolveAppointmentCoordinates({
			latitude: origin_latitude,
			longitude: origin_longitude,
		})

	const destination: AppointmentLocation | null =
		resolveAppointmentCoordinates({
			latitude: destination_latitude,
			longitude: destination_longitude,
		})

	return {
		id,
		title,
		description,
		duration,
		date,
		client: client as Person,
		provider: provider as Person,
		url,
		origin,
		destination,
	}
}

export const transformAppointmentFromDB = async (
	record: AppointmentSchema | null
): Promise<Appointment> => {
	if (!record)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.BAD_REQUEST,
			'transformAppointmentFromDB'
		)

	const transformed: Partial<Appointment> = {
		id: record.id,
		title: record.title,
		description: record.description,
		duration: record.duration,
		date: record.date,
		url: record.url,
	}

	const client: Person | null = await getPerson({
		id: record.client_id,
	})

	if (!client)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'transformAppointmentFromDB'
		)
	else transformed.client = client

	const provider: Person | null = await getPerson({
		id: record.provider_id,
	})

	if (!provider)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'transformAppointmentFromDB'
		)
	else transformed.provider = provider

	if (record.client_id)
		if (record.origin_latitude && record.origin_longitude)
			transformed.origin = {
				latitude: record.origin_latitude,
				longitude: record.origin_longitude,
			}
		else transformed.origin = null

	if (record.destination_latitude && record.destination_longitude)
		transformed.origin = {
			latitude: record.destination_latitude,
			longitude: record.destination_longitude,
		}
	else transformed.destination = null

	return has_appointment_retrieve_schema.validateSync(transformed)
}

export const getDayBounds = (iso: string) => {
	const date: DateTime = DateTime.fromISO(iso)

	const start: string = date.startOf('day').toISO()!
	const end: string = date.endOf('day').toISO()!

	return [start, end]
}

export const convertDateToISO = (date: string): string => {
	const date_time = DateTime.fromISO(date).toLocal()
	const iso: string | null = date_time.toISO()

	if (!iso)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.INTERNAL_ERROR,
			'convertDateToISO'
		)

	return iso
}

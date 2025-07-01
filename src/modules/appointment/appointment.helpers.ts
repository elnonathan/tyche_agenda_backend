import {
	Appointment,
	AppointmentSchema,
} from '@/modules/appointment/appointment.schema'
import { DateTime } from 'luxon'
import { hasAppointmentSchema } from '@/modules/appointment/appointment.validations'
import { getPerson } from '@/modules/person/actions/person.retrieve'
import { Person } from '@/modules/person/person.schema'
import { CustomError } from '@/errors/errors.utils'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'

export const transformAppointmentFromDB = async (
	record: AppointmentSchema | null
): Promise<Appointment | null> => {
	if (!record) return null

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

	const provider: Person | null = await getPerson({
		id: record.provider_id,
	})

	if (!provider)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'transformAppointmentFromDB'
		)

	if (record.client_id)
		if (record.origin_latitude && record.origin_longitude)
			transformed.origin = {
				latitude: record.origin_latitude,
				longitude: record.origin_longitude,
			}

	if (record.destination_latitude && record.destination_longitude)
		transformed.origin = {
			latitude: record.destination_latitude,
			longitude: record.destination_longitude,
		}

	return hasAppointmentSchema.validateSync(transformed as Appointment)
}

export const getDayBounds = (iso: string) => {
	const date: DateTime = DateTime.fromISO(iso)

	const start: string = date.startOf('day').toISO()!
	const end: string = date.endOf('day').toISO()!

	return [start, end]
}

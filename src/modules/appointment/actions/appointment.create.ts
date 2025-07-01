import {
	Appointment,
	AppointmentSchema,
} from '@/modules/appointment/appointment.schema'
import { findAppointment } from '@/modules/appointment/actions/appointment.retrieve'
import { CustomError } from '@/errors/errors.utils'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'
import { database } from '@/database/database.client'
import { appointment } from '@/modules/appointment/appointment.model'
import { COMMON_NUMBERS } from '@/constants'
import { transformAppointmentFromDB } from '@/modules/appointment/appointment.helpers'

export const createAppointment = async ({
	title,
	description,
	duration,
	date,
	client,
	provider,
	url,
	origin,
	destination,
}: Appointment): Promise<Appointment | null> => {
	if (!client?.id || !provider?.id)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.BAD_REQUEST,
			'createAppointment'
		)

	const { id: client_id } = client
	const { id: provider_id } = provider

	const found: AppointmentSchema | null = await findAppointment({
		client,
		provider,
		url,
		title,
		date,
	})

	if (found)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.CONFLICT,
			'createAppointment'
		)

	const next: AppointmentSchema = {
		title,
		description,
		duration,
		date,
		client_id,
		provider_id,
		url,
		origin_latitude: origin?.latitude,
		origin_longitude: origin?.longitude,
		destination_latitude: destination?.latitude,
		destination_longitude: destination?.longitude,
	} satisfies AppointmentSchema

	const { rowsAffected } = await database.insert(appointment).values(next)

	if (rowsAffected === COMMON_NUMBERS.ZERO)
		throw new CustomError(
			HTTP_CODE_NUMBER?.SATISFACTORY?.NO_CONTENT,
			'createAppointment'
		)

	return transformAppointmentFromDB(next)
}

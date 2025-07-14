import {
	Appointment,
	AppointmentSchema,
} from '@/modules/appointment/appointment.schema'
import { getAppointment } from '@/modules/appointment/actions/appointment.retrieve'
import { CustomError } from '@/errors/errors.utils'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'
import { database } from '@/database/database.client'
import { appointment } from '@/modules/appointment/appointment.model'
import { eq } from 'drizzle-orm'
import { COMMON_NUMBERS } from '@/constants'

export const updateAppointment = async ({
	id,
	title,
	description,
	duration,
	date,
	client,
	provider,
	url,
	origin,
	destination,
}: Appointment): Promise<AppointmentSchema> => {
	const found: AppointmentSchema | null = await getAppointment({ id })

	if (!client.id || !provider.id)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.BAD_REQUEST,
			'updateAppointment'
		)

	if (!found)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'updateAppointment'
		)

	const update: Omit<AppointmentSchema, 'id'> = {
		title,
		description,
		duration,
		date,
		client_id: client.id,
		provider_id: client.id,
		url,
		origin_latitude: origin?.latitude || null,
		origin_longitude: origin?.latitude || null,
		destination_latitude: destination?.latitude || null,
		destination_longitude: destination?.longitude || null,
	}

	const { rowsAffected = COMMON_NUMBERS.ZERO } = await database
		.update(appointment)
		.set(update)
		// @ts-expect-error : schema id property do exist
		.where(eq(appointment.id, id))

	if (rowsAffected === COMMON_NUMBERS.ZERO)
		throw new CustomError(
			HTTP_CODE_NUMBER?.SATISFACTORY?.NO_CONTENT,
			'updateAppointment'
		)

	return update
}

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
}: Appointment): Promise<Appointment> => {
	const found: AppointmentSchema | null = await getAppointment({ id })

	if (!client || !provider)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.BAD_REQUEST,
			'updateAppointment'
		)

	if (!found)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'updateAppointment'
		)

	const update: Omit<Appointment, 'id'> = {
		title,
		description,
		duration,
		date,
		client,
		provider,
		url,
		origin,
		destination,
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

	return { ...found, ...update }
}

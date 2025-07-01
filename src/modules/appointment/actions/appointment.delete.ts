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

export const deleteAppointment = async ({
	id,
}: Appointment): Promise<Pick<Appointment, 'id'>> => {
	const found: AppointmentSchema | null = await getAppointment({ id })

	if (!found)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'deleteAppointment'
		)

	const { rowsAffected = COMMON_NUMBERS.ZERO } = await database
		.delete(appointment)
		// @ts-expect-error : schema id property do exist
		.where(eq(appointment.id, id))

	if (rowsAffected === COMMON_NUMBERS.ZERO)
		throw new CustomError(
			HTTP_CODE_NUMBER?.SATISFACTORY?.NO_CONTENT,
			'deleteAppointment'
		)

	return { id } as Pick<Appointment, 'id'>
}

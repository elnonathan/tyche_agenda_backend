import { CustomRequest } from '@/router/router.schema'
import { Response } from 'express'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'
import {
	Appointment,
	AppointmentFilter,
	AppointmentSchema,
} from '@/modules/appointment/appointment.schema'
import { createAppointment } from '@/modules/appointment/actions/appointment.create'
import {
	findAppointment,
	getAppointment,
	listAppointments,
	searchAppointments,
} from '@/modules/appointment/actions/appointment.retrieve'
import { Pagination } from '@/database/database.schema'
import { transformAppointmentFromDB } from '@/modules/appointment/appointment.helpers'
import { CustomError } from '@/errors/errors.utils'
import { updateAppointment } from '@/modules/appointment/actions/appointment.update'
import { deleteAppointment } from '@/modules/appointment/actions/appointment.delete'

export const createAppointmentService = async (
	{ body }: CustomRequest,
	response: Response
): Promise<void> => {
	const appointment: Awaited<Appointment | null> =
		await createAppointment(body as Appointment)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.CREATED as number).json(
		appointment
	)
}

export const getAppointmentService = async (
	{ params }: CustomRequest,
	response: Response
): Promise<void> => {
	const appointment: Awaited<AppointmentSchema | null> =
		await getAppointment(params as Partial<Appointment>)

	if (!appointment)
		throw new CustomError(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.NOT_FOUND,
			'getAppointment'
		)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		transformAppointmentFromDB(appointment)
	)
}

export const findAppointmentService = async (
	{ query }: CustomRequest,
	response: Response
): Promise<void> => {
	const appointment: Awaited<AppointmentSchema | null> =
		await findAppointment(query as unknown as AppointmentFilter)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		transformAppointmentFromDB(appointment)
	)
}

export const searchAppointmentsService = async (
	{ query }: CustomRequest,
	response: Response
): Promise<void> => {
	const appointments: Awaited<AppointmentSchema[]> =
		await searchAppointments(query as unknown as AppointmentFilter)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		appointments.map(transformAppointmentFromDB)
	)
}

export const listAppointmentsService = async (
	{ query }: CustomRequest,
	response: Response
): Promise<void> => {
	const appointments: Awaited<AppointmentSchema[]> =
		await listAppointments(query as unknown as Pagination)

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		appointments.map(transformAppointmentFromDB)
	)
}

export const updateAppointmentService = async (
	{ body }: CustomRequest,
	response: Response
): Promise<void> => {
	const appointment: Awaited<Appointment> = (await updateAppointment(
		body as Appointment
	)) satisfies Appointment

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		appointment
	)
}

export const deleteAppointmentService = async (
	{ params }: CustomRequest,
	response: Response
): Promise<void> => {
	const appointment: Awaited<Pick<Appointment, 'id'>> =
		(await deleteAppointment(
			params as unknown as Appointment
		)) as Appointment

	response.status(HTTP_CODE_NUMBER?.SATISFACTORY?.OK as number).json(
		appointment
	)
}

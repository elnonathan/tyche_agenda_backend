import {
	Appointment,
	AppointmentFilter,
	AppointmentSchema,
} from '@/modules/appointment/appointment.schema'
import { and, between, BinaryOperator, eq, like, SQL } from 'drizzle-orm'
import { database } from '@/database/database.client'
import { appointment } from '@/modules/appointment/appointment.model'
import { getDayBounds } from '@/modules/appointment/appointment.helpers'
import { DEFAULT_APPOINTMENT_LIST_LIMIT } from '@/modules/appointment/appointment.constants'
import { COMMON_NUMBERS } from '@/constants'
import { Pagination } from '@/database/database.schema'

const list = async (
	{
		limit = DEFAULT_APPOINTMENT_LIST_LIMIT,
		offset = COMMON_NUMBERS.ZERO,
	}: Pagination = {
		limit: DEFAULT_APPOINTMENT_LIST_LIMIT,
		offset: COMMON_NUMBERS.ZERO,
	}
): Promise<AppointmentSchema[]> =>
	((await database
		.select()
		.from(appointment)
		.limit(Number(limit))
		.offset(Number(offset))) as AppointmentSchema[]) || []

const find = async (
	condition: SQL<BinaryOperator>,
	{ limit, offset }: Pagination = {
		limit: DEFAULT_APPOINTMENT_LIST_LIMIT,
		offset: COMMON_NUMBERS.ZERO,
	}
): Promise<AppointmentSchema[]> =>
	((await database
		.select()
		.from(appointment)
		.limit(Number(limit))
		.offset(Number(offset))
		.where(condition)) as AppointmentSchema[]) || []

const filterAppointmentsById = async (
	{ id }: Pick<AppointmentSchema, 'id'>,
	pagination: Pagination = {
		limit: COMMON_NUMBERS.ONE,
		offset: COMMON_NUMBERS.ZERO,
	}
): Promise<AppointmentSchema[]> =>
	await find(
		// @ts-expect-error : schema id property does exist
		eq(appointment.id, id),
		pagination
	)

const filterAppointmentByTitle = async (
	{
		title,
		client_id,
		provider_id,
	}: Pick<AppointmentSchema, 'title' | 'client_id' | 'provider_id'>,
	pagination?: Pagination
): Promise<AppointmentSchema[]> =>
	await find(
		// @ts-expect-error : schema title, client_id and provider_id properties do exist
		and(
			// @ts-expect-error : schema title property does exist
			like(appointment.title, `%${title}%`),
			// @ts-expect-error : schema client_id property does exist
			eq(appointment.client_id, client_id),
			// @ts-expect-error : schema provider_id property does exist
			eq(appointment.provider_id, provider_id)
		),
		pagination
	)

const filterAppointmentByDate = async (
	{
		date,
		client_id,
		provider_id,
	}: Pick<AppointmentSchema, 'date' | 'client_id' | 'provider_id'>,
	pagination?: Pagination
): Promise<AppointmentSchema[]> => {
	if (!date) return []

	const [start, end] = getDayBounds(date)

	return await find(
		// @ts-expect-error : schema title, client_id and provider_id properties do exist
		and(
			// @ts-expect-error : schema title property does exist
			between(appointment.date, start, end),
			// @ts-expect-error : schema client_id property does exist
			eq(appointment.client_id, client_id),
			// @ts-expect-error : schema provider_id property does exist
			eq(appointment.provider_id, provider_id)
		),
		pagination
	)
}

const filterAppointmentByUrl = async (
	{
		url,
		client_id,
		provider_id,
	}: Pick<AppointmentSchema, 'url' | 'client_id' | 'provider_id'>,
	pagination?: Pagination
): Promise<AppointmentSchema[]> =>
	await find(
		// @ts-expect-error : schema title, client_id and provider_id properties do exist
		and(
			// @ts-expect-error : schema url property does exist
			like(appointment.url, `%${url}%`),
			// @ts-expect-error : schema client_id property does exist
			eq(appointment.client_id, client_id),
			// @ts-expect-error : schema provider_id property does exist
			eq(appointment.provider_id, provider_id)
		),
		pagination
	)

const filterAppointment = async (
	{
		title,
		date,
		client,
		provider,
		url,
	}: Pick<Appointment, 'title' | 'date' | 'client' | 'provider' | 'url'>,
	pagination?: Pagination
): Promise<AppointmentSchema[]> => {
	let appointments: AppointmentSchema[] = []

	if (!client?.id || !provider?.id) return appointments

	const { id: client_id } = client
	const { id: provider_id } = provider

	if (title)
		appointments = await filterAppointmentByTitle(
			{
				title,
				client_id,
				provider_id,
			},
			pagination
		)

	if (date)
		appointments = await filterAppointmentByDate(
			{
				date,
				client_id,
				provider_id,
			},
			pagination
		)

	if (url)
		appointments = await filterAppointmentByUrl(
			{
				url,
				client_id,
				provider_id,
			},
			pagination
		)

	if (!title && !date && !url) appointments = await list(pagination)

	return appointments
}

export const getAppointment = async (
	{ id }: Pick<Appointment, 'id'> = {} as Appointment
): Promise<AppointmentSchema | null> => {
	if (!id) return null

	const [found]: Awaited<AppointmentSchema[]> =
		await filterAppointmentsById({ id })

	return found || null
}

export const findAppointment = async (
	appointment: AppointmentFilter = {} as Appointment
): Promise<AppointmentSchema | null> => {
	const pagination: Pagination = {
		limit: COMMON_NUMBERS.ONE,
		offset: COMMON_NUMBERS.ZERO,
	}

	const [found]: Awaited<AppointmentSchema[]> = await filterAppointment(
		appointment,
		pagination
	)

	if (!found) return null
	return found
}

export const searchAppointments = async (
	appointment: AppointmentFilter = {} as Appointment,
	pagination?: Pagination
): Promise<AppointmentSchema[]> =>
	await filterAppointment(appointment, pagination)

export const listAppointments = async (
	pagination?: Pagination
): Promise<AppointmentSchema[]> => await list(pagination)

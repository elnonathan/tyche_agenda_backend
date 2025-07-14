import express, { Router } from 'express'
import {
	validateRequestRole,
	validateRequestSchema,
} from '@/router/router.validations'
import { HTTP_REQUEST_DATA_SOURCE } from '@/router/router.constants'
import {
	has_appointment_create_schema,
	has_appointment_filter_schema,
	has_appointment_update_schema,
} from '@/modules/appointment/appointment.validations'
import { requestAsynchronously } from '@/router/router.utils'
import {
	createAppointmentService,
	deleteAppointmentService,
	findAppointmentService,
	getAppointmentService,
	listAppointmentsService,
	searchAppointmentsService,
	updateAppointmentService,
} from '@/modules/appointment/appointment.controller'
import { has_id_schema } from '@/database/database.validations'
import {
	EXTENDED_CREATE_ROLES,
	PERMISSIVE_RETRIEVE_ROLES,
	SAFE_DELETE_ROLES,
	SAFE_UPDATE_ROLES,
} from '@/modules/user/user.constants'

export const appointment_routes: Router = express.Router()

appointment_routes.post(
	'/',
	validateRequestRole(EXTENDED_CREATE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.BODY,
		has_appointment_create_schema
	),
	requestAsynchronously(createAppointmentService)
)

appointment_routes.get(
	'/get/:id',
	validateRequestRole(PERMISSIVE_RETRIEVE_ROLES),
	validateRequestSchema(HTTP_REQUEST_DATA_SOURCE.PARAMS, has_id_schema),
	requestAsynchronously(getAppointmentService)
)

appointment_routes.get(
	'/find',
	validateRequestRole(PERMISSIVE_RETRIEVE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.QUERY,
		has_appointment_filter_schema
	),
	requestAsynchronously(findAppointmentService)
)

appointment_routes.get(
	'/search',
	validateRequestRole(PERMISSIVE_RETRIEVE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.QUERY,
		has_appointment_filter_schema
	),
	requestAsynchronously(searchAppointmentsService)
)

appointment_routes.get(
	'/list',
	validateRequestRole(PERMISSIVE_RETRIEVE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.QUERY,
		has_appointment_filter_schema
	),
	requestAsynchronously(listAppointmentsService)
)

appointment_routes.put(
	'/',
	validateRequestRole(SAFE_UPDATE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.BODY,
		has_appointment_update_schema
	),
	requestAsynchronously(updateAppointmentService)
)

appointment_routes.delete(
	'/:id',
	validateRequestRole(SAFE_DELETE_ROLES),
	validateRequestSchema(HTTP_REQUEST_DATA_SOURCE.PARAMS, has_id_schema),
	requestAsynchronously(deleteAppointmentService)
)

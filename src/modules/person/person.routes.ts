import express, { Router } from 'express'

import { requestAsynchronously } from '@/router/router.utils'
import {
	createPersonService,
	findPersonService,
	getPersonService,
	listPeopleService,
	searchPeopleService,
	updatePersonService,
} from '@/modules/person/person.controller'
import {
	validateRequestRole,
	validateRequestSchema,
} from '@/router/router.validations'
import {
	has_person_create_schema,
	has_person_filter_schema,
	has_person_update_schema,
} from '@/modules/person/person.validations'
import { HTTP_REQUEST_DATA_SOURCE } from '@/router/router.constants'
import { has_id_schema } from '@/database/database.validations'
import {
	EXTENDED_CREATE_ROLES,
	SAFE_RETRIEVE_ROLES,
	SAFE_UPDATE_ROLES,
} from '@/modules/user/user.constants'

export const person_routes: Router = express.Router()

person_routes.post(
	'/',
	validateRequestRole(EXTENDED_CREATE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.BODY,
		has_person_create_schema
	),
	requestAsynchronously(createPersonService)
)

person_routes.get(
	'/get/:id',
	validateRequestRole(SAFE_RETRIEVE_ROLES),
	validateRequestSchema(HTTP_REQUEST_DATA_SOURCE.PARAMS, has_id_schema),
	requestAsynchronously(getPersonService)
)

person_routes.get(
	'/find',
	validateRequestRole(SAFE_RETRIEVE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.QUERY,
		has_person_filter_schema
	),
	requestAsynchronously(findPersonService)
)

person_routes.get(
	'/search',
	validateRequestRole(SAFE_RETRIEVE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.QUERY,
		has_person_filter_schema
	),
	requestAsynchronously(searchPeopleService)
)

person_routes.get(
	'/list',
	validateRequestRole(SAFE_RETRIEVE_ROLES),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.QUERY,
		has_person_filter_schema
	),
	requestAsynchronously(listPeopleService)
)

person_routes.put(
	'/:id',
	validateRequestRole(SAFE_UPDATE_ROLES),
	validateRequestSchema(HTTP_REQUEST_DATA_SOURCE.PARAMS, has_id_schema),
	validateRequestSchema(
		HTTP_REQUEST_DATA_SOURCE.BODY,
		has_person_update_schema
	),
	requestAsynchronously(updatePersonService)
)

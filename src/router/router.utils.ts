import { NextFunction, Response } from 'express'
import { AsyncRequest, CustomRequest } from '@/router/router.schema'
import {
	HTTP_CODE_MEANING,
	HTTP_CODE_MESSAGE,
	HTTP_CODE_NUMBER,
} from '@/router/router.constants'
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup'

export const requestAsynchronously =
	(callback: AsyncRequest) =>
	(request: CustomRequest, response: Response, next: NextFunction) => {
		callback(request, response, next).catch(next)
	}

export const auditRequestPayload = async (
	payload: object,
	schema: ObjectSchema<Maybe<AnyObject>>
): Promise<ValidationError | null> => {
	try {
		await schema.validate(payload)
		return null
	} catch (error) {
		return error as ValidationError
	}
}

export const rejectRequestRole = (
	response: Response,
	HTTP_CODE: number = HTTP_CODE_NUMBER?.CLIENT_ERRORS
		?.INTERNAL_ERROR as number
): void => {
	response.status(HTTP_CODE).json({
		message: HTTP_CODE_MESSAGE[HTTP_CODE],
		path: 'validateRequestRole',
		type: HTTP_CODE_MEANING[HTTP_CODE],
	})
}

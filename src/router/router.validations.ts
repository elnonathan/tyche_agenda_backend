import { UserRole } from '@/modules/user/user.schema'
import { NextFunction, RequestHandler, Response } from 'express'
import { CustomRequest, RequestDataSource } from '@/router/router.schema'
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup'
import { auditRequestPayload } from '@/router/router.utils'
import { HTTP_CODE_NUMBER } from '@/router/router.constants'

export const validateRequestRole =
	(roles: UserRole[]): RequestHandler =>
	async (
		request: CustomRequest,
		response: Response,
		next: NextFunction
	): Promise<void> => {
		/*
	const bearer: string | undefined = request.get('Authorization')
	const session: Session | null = await getSessionByBearer(bearer)

	if (!session?.user)
		return rejectRequest(
			response,
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.UNAUTHORIZED
		)

	if (!roles.includes(session?.user?.role))
		return rejectRequest(
			response,
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.ACCESS_FORBIDDEN
		)
	*/
		next()
	}

export const validateRequestSchema =
	(source: RequestDataSource, schema: ObjectSchema<Maybe<AnyObject>>) =>
	async (
		request: CustomRequest,
		response: Response,
		next: NextFunction
	): Promise<void> => {
		const payload = request[source]
		const error: ValidationError | null = await auditRequestPayload(
			payload,
			schema
		)

		if (!error) return next()

		response.status(
			HTTP_CODE_NUMBER?.CLIENT_ERRORS?.BAD_REQUEST as number
		).json({
			type: error.type,
			path: error.path,
			message: error.message,
		})
	}

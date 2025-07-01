import { NextFunction, Response } from 'express'

import {
	defineErrorMessage,
	defineErrorPath,
	defineErrorStatus,
	defineErrorType,
} from '@/errors/error.helpers'
import { CustomRequest } from '@/router/router.schema'

export class CustomError extends Error {
	private readonly _message: string
	private readonly _status: number
	private readonly _path?: string
	private readonly _type?: string

	constructor(error_status?: number, error_path?: string) {
		const status: number = defineErrorStatus(error_status)
		const path: string = defineErrorPath(error_path)

		super()
		this._status = status
		this._path = path
		this._type = defineErrorType(status)
		this._message = defineErrorMessage(status)
	}

	get message(): string {
		return this._message
	}

	get type(): string | undefined {
		return this._type
	}

	get path(): string | undefined {
		return this._path
	}

	get status(): number {
		return this._status
	}
}

export const catchRequestError = (
	error: TypeError | CustomError | Error,
	_: CustomRequest,
	response: Response,
	next: NextFunction
) => {
	if (!error) next(error)
	if (!(error instanceof CustomError)) {
		const { status, path, type, message }: CustomError =
			new CustomError()
		response.status(status).send({ message, path, type })
		return
	}

	response.status(error.status).send({
		message: error.message,
		path: error.path,
		type: error.type,
	})
}

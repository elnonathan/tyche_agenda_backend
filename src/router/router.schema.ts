import { NextFunction, Request, Response } from 'express'

export interface CustomRequest extends Request {
	user?: object
}

export type AsyncRequest = (
	request: CustomRequest,
	response: Response,
	next: NextFunction
) => Promise<void>

export type RequestDataSource = keyof Pick<
	CustomRequest,
	'body' | 'params' | 'query'
>

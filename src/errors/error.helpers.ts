import {
	DEFAULT_ERROR_MEANING,
	DEFAULT_ERROR_MESSAGE,
	DEFAULT_ERROR_PATH,
} from '@/errors/error.constants'
import {
	HTTP_CODE_MEANING,
	HTTP_CODE_MESSAGE,
	HTTP_CODE_NUMBER,
} from '@/router/router.constants'

export const defineErrorStatus = (
	status: number = HTTP_CODE_NUMBER?.SERVER_ERRORS
		?.INTERNAL_ERROR as number
): number => status

export const defineErrorPath = (path: string = DEFAULT_ERROR_PATH): string =>
	path

export const defineErrorType = (status: number): string => {
	if (!status) return DEFAULT_ERROR_MEANING
	return HTTP_CODE_MEANING[status] as string
}

export const defineErrorMessage = (status?: number): string => {
	if (!status) return DEFAULT_ERROR_MESSAGE
	return HTTP_CODE_MESSAGE[status] as string
}

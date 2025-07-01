import {
	HTTP_CODE_MEANING,
	HTTP_CODE_MESSAGE,
	HTTP_CODE_NUMBER,
} from '@/router/router.constants'
import { COMMON_STRINGS } from '@/constants'

export const DEFAULT_ERROR_PATH: string = COMMON_STRINGS.DOT as const

export const DEFAULT_ERROR_MEANING: string = HTTP_CODE_MEANING[
	HTTP_CODE_NUMBER?.SERVER_ERRORS?.INTERNAL_ERROR as number
] as string

export const DEFAULT_ERROR_MESSAGE: string = HTTP_CODE_MESSAGE[
	HTTP_CODE_NUMBER?.SERVER_ERRORS?.INTERNAL_ERROR as number
] as string

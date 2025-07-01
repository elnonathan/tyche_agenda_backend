import { COMMON_STRINGS } from '@/constants'
import { Session } from '@/modules/session/session.schema'

export const getSessionByBearer = async (
	bearer: string = COMMON_STRINGS.EMPTY_STRING
): Promise<Session | null> => {
	return null
}

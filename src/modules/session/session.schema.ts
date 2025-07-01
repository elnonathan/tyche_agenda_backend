import { User } from '@/modules/user/user.schema'

export type Session = {
	id: number
	bearer: string
	user: User
}

export type SessionSchema = Omit<Session, 'user'> & {
	id_user: number
	expiredAt: Date
}

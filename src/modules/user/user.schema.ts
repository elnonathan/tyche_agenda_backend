import {
	CUSTOMER_USER_ROLES,
	END_USER_ROLES,
	INTERNAL_USER_ROLES,
} from '@/modules/user/user.constants'
import { Person } from '@/modules/person/person.schema'

export type UserRole =
	| INTERNAL_USER_ROLES
	| CUSTOMER_USER_ROLES
	| END_USER_ROLES

export type User = {
	id: number
	password: string
	person: Person
	role: UserRole
}

export type UserSchema = Omit<User, 'person'> & {
	id_person: number
}

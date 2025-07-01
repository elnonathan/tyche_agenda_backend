export type Person = {
	id?: number
	first_name: string
	last_name: string
	phone: string
	email: string
}

export type PersonSchema = Person

export type PersonFilter = Pick<Person, 'phone' | 'email'>

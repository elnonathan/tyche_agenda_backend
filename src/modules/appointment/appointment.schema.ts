import { Person } from '@/modules/person/person.schema'

export type AppointmentLocation = {
	latitude: number
	longitude: number
}

export type Appointment = {
	id?: number
	title: string
	description?: string
	duration: number // MINUTES
	date: string
	client: Person
	provider: Person
	url?: string
	origin: AppointmentLocation | null
	destination: AppointmentLocation | null
}

export type AppointmentSchema = Omit<
	Appointment,
	'client' | 'provider' | 'origin' | 'destination'
> & {
	client_id: number
	provider_id: number
	origin_latitude: number | null
	origin_longitude: number | null
	destination_latitude: number | null
	destination_longitude: number | null
}

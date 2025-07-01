import { Person } from '@/modules/person/person.schema'

type AppointmentLocation = {
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
	origin?: AppointmentLocation
	destination?: AppointmentLocation
}

export type AppointmentSchema = Omit<
	Appointment,
	'client' | 'provider' | 'origin' | 'destination'
> & {
	client_id: number
	provider_id: number
	origin_latitude?: number
	origin_longitude?: number
	destination_latitude?: number
	destination_longitude?: number
}

export type AppointmentFilter = Pick<
	Appointment,
	'client' | 'provider' | 'title' | 'date' | 'url'
>

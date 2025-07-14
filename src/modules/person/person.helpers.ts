import { Person, PersonSchema } from '@/modules/person/person.schema'
import { has_person_retrieve_schema } from '@/modules/person/person.validations'

// NOT TRANSFORMATION REQUIRED AT THE MOMENT
export const transformPersonFromDB = (
	record: PersonSchema | null
): Person | null => {
	if (!record) return null
	return has_person_retrieve_schema.validateSync(record)
}

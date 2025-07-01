import { Person, PersonSchema } from '@/modules/person/person.schema'
import { hasPersonSchema } from '@/modules/person/person.validations'

// NOT TRANSFORMATION REQUIRED AT THE MOMENT
export const transformPersonFromDB = (
	record: PersonSchema | null
): Person | null => {
	if (!record) return null
	return hasPersonSchema.validateSync(record)
}

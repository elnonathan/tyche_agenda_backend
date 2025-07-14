import * as yup from 'yup'

export const has_id_schema = yup.object().shape({
	id: yup.number().required(),
})

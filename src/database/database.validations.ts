import * as yup from 'yup'

export const hasIdSchema = yup.object().shape({
	id: yup.number().required(),
})

import { Router } from 'express'
import { person_routes } from '@/modules/person/person.routes'
import { appointment_routes } from '@/modules/appointment/appointment.routes'

export const router: Router = Router()

router.use('/person', person_routes)
router.use('/appointment', appointment_routes)

import express, { Router } from 'express'

export const calendar_routes: Router = express.Router()

calendar_routes.post('/')
calendar_routes.get('/:id')
calendar_routes.get('/list')
calendar_routes.put('/')
calendar_routes.delete('/')

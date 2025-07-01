import express, { Router } from 'express'

export const dashboard_routes: Router = express.Router()

dashboard_routes.post('/')
dashboard_routes.get('/:id')
dashboard_routes.get('/list')
dashboard_routes.put('/')
dashboard_routes.delete('/')

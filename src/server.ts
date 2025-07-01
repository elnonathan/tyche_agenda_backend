import express, { Express } from 'express'
import cors from 'cors'
import body_parser from 'body-parser'
import 'dotenv/config'
import { catchRequestError } from '@/errors/errors.utils'
import { router } from '@/routes'

const name: string = process.env.NAME as string
const host: string = process.env.HOST as string
const port: string = process.env.PORT as string

const app: Express = express()

app.use(body_parser.json())
app.use(cors())
app.use(body_parser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(router)
app.use(catchRequestError)

app.listen(port, () => {
	console.log(`${name} @ ${host}:${port}`)
})

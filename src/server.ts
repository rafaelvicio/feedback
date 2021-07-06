import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import '@config/database'

import { router } from './routes'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(router)

app.listen(process.env.PORT || 3333, () => {
  console.log('Feedback: API Running')
})

import { requestLogger } from '@middlewares/index';
import express from 'express'
import cors from 'cors'

import api from '@routes/api/api.routes'
import { serverConfig } from '@configs/index'
import prepare from '@configs/prepare';
import helmet from 'helmet'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use(express.static('static'))

app.use(requestLogger)

app.use('/api/v1', api)

app.listen(serverConfig.port, serverConfig.host, 0, () => {
    console.log(`Server running on http://localhost:${serverConfig.port}`)
    prepare()
})
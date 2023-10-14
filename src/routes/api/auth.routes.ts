import { checkPhone, login, verify, register } from '@controllers/auth'
import { Router } from 'express'

export default Router({ mergeParams: true })
    .post('/login', login)
    .get('/checkPhone', checkPhone)
    .get('/verify', verify)
    .post('/register', register)
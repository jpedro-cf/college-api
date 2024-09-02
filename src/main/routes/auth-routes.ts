import { FastifyInstance } from 'fastify'
import {
    makeAuthController,
    makeCurrentUserController,
    makeSignUpController
} from '../factories/controllers/AuthControllersFactory'

export default function authRoutes(app: FastifyInstance) {
    app.post('/api/auth/register', {}, async (req, res) => {
        const controller = makeSignUpController()
        const { statusCode, body, cookies } = await controller.handle(req)
        if (cookies) {
            res.setCookie('access_token', cookies, {
                path: '/',
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            })
        }
        return res.code(statusCode).send(body)
    })
    app.post('/api/auth/login', {}, async (req, res) => {
        const controller = makeAuthController()
        const { statusCode, body, cookies } = await controller.handle(req)
        if (cookies) {
            res.setCookie('access_token', cookies, {
                path: '/',
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            })
        }
        return res.code(statusCode).send(body)
    })
    app.get('/api/auth/me', {}, async (req, res) => {
        const controller = makeCurrentUserController()
        const { statusCode, body } = await controller.handle(req)
        return res.code(statusCode).send(body)
    })
}

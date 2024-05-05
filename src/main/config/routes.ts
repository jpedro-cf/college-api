import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SignUpRoute } from '../routes/auth/SignUpRoute'
import { AuthenticationRoute } from '../routes/auth/AuthenticationRoute'
import { CurrentUserRoute } from '../routes/auth/CurrentUserInfoRoute'

export default function routesConfig(app: FastifyInstance) {
    app.post('/api/register', {}, SignUpRoute)
    app.post('/api/login', {}, AuthenticationRoute)
    app.get('/api/current_user', {}, CurrentUserRoute)
}

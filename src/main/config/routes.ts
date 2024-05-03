import { FastifyInstance } from 'fastify'
import { SignUpRoute } from '../routes/auth/SignUpRoute'
import { AuthenticationRoute } from '../routes/auth/AuthenticationRoute'

export default function routesConfig(app: FastifyInstance) {
    app.post('/api/register', {}, SignUpRoute)
    app.post('/api/login', {}, AuthenticationRoute)
}

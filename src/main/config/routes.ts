import { FastifyInstance } from 'fastify'
import { SignUpRoute } from '../routes/auth/SignUpRoute'

export default function routesConfig(app: FastifyInstance) {
    app.post('/api/register', {}, SignUpRoute)
}

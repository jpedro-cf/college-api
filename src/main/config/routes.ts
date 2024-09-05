import { FastifyInstance } from 'fastify'
import authRoutes from '../routes/auth-routes'
import categoriesRoutes from '../routes/categories-routes'
import questionsRoutes from '../routes/questions-routes'
import usersRoutes from '../routes/users-routes'
import answersRoutes from '../routes/answers-routes'

export default function routesConfig(app: FastifyInstance) {
    authRoutes(app)
    categoriesRoutes(app)
    questionsRoutes(app)
    usersRoutes(app)
    answersRoutes(app)
}

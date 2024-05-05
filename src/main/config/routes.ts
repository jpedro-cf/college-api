import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SignUpRoute } from '../routes/auth/SignUpRoute'
import { AuthenticationRoute } from '../routes/auth/AuthenticationRoute'
import { CurrentUserRoute } from '../routes/auth/CurrentUserInfoRoute'
import { CreateQuestionsCategoryRoute } from '../routes/questionsCategory/CreateQuestionsCategoryRoute'
import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { GetByTokenUseCase } from '@/application/auth/GetByTokenUseCase'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'

export default function routesConfig(app: FastifyInstance) {
    app.post('/api/register', {}, SignUpRoute)
    app.post('/api/login', {}, AuthenticationRoute)
    app.get('/api/current_user', {}, CurrentUserRoute)

    const usersRepository = new DbUsersRepository()

    const rolesPreHandler = new RolesPreHandler(['admin'], new GetByTokenUseCase(usersRepository))

    app.post(
        '/api/questions_category',
        { preHandler: rolesPreHandler.handle.bind(rolesPreHandler) },
        CreateQuestionsCategoryRoute
    )
}

import { FastifyInstance } from 'fastify'
import { SignUpRoute } from '../routes/auth/SignUpRoute'
import { AuthenticationRoute } from '../routes/auth/AuthenticationRoute'
import { CurrentUserRoute } from '../routes/auth/CurrentUserInfoRoute'
import { CreateQuestionsCategoryRoute } from '../routes/questionsCategory/CreateQuestionsCategoryRoute'
import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { GetByTokenUseCase } from '@/application/auth/GetByTokenUseCase'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { GetQuestionsCategoryRoute } from '../routes/questionsCategory/GetQuestionsCategoriesRoute'
import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { UpdateQuestionsCategoryRoute } from '../routes/questionsCategory/UpdateQuestionsCategoryRoute'
import { DeleteQuestionsCategoryRoute } from '../routes/questionsCategory/DeleteQuestionsCategoryRoute'
import { UpdateUserRoute } from '../routes/users/UpdateUserRoute'
import { GetUsersRoute } from '../routes/users/GetUsersRoute'

export default function routesConfig(app: FastifyInstance) {
    const usersRepository = new DbUsersRepository()
    const jwt = new JWTAdapter()
    const adminPrehandler = new RolesPreHandler(['admin'], new GetByTokenUseCase(usersRepository, jwt))
    const studentPrehandler = new RolesPreHandler(['student', 'admin'], new GetByTokenUseCase(usersRepository, jwt))

    app.post('/api/register', {}, SignUpRoute)
    app.post('/api/login', {}, AuthenticationRoute)
    app.get('/api/current_user', {}, CurrentUserRoute)

    app.put('/api/users', {}, UpdateUserRoute)
    app.get('/api/users', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, GetUsersRoute)

    app.post(
        '/api/questions_category',
        { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
        CreateQuestionsCategoryRoute
    )
    app.put(
        '/api/questions_category',
        { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
        UpdateQuestionsCategoryRoute
    )
    app.delete(
        '/api/questions_category',
        { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
        DeleteQuestionsCategoryRoute
    )
    app.get(
        '/api/questions_category',
        { preHandler: studentPrehandler.handle.bind(studentPrehandler) },
        GetQuestionsCategoryRoute
    )
}

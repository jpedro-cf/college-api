import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { FastifyInstance } from 'fastify'
import { makeAuthUseCase } from '../factories/use-cases/AuthUseCasesFactory'
import { makeGetUsersController, makeUpdateUsersController } from '../factories/controllers/UsersControllersFactory'

export default function usersRoutes(app: FastifyInstance) {
    const adminPrehandler = new RolesPreHandler(['admin'], makeAuthUseCase())
    const usersPreHandler = new RolesPreHandler(['admin', 'student', 'editor', 'manager', 'user'], makeAuthUseCase())

    app.get('/api/users', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeGetUsersController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })

    app.put('/api/users/:id', { preHandler: usersPreHandler.handle.bind(usersPreHandler) }, async (req, res) => {
        const controller = makeUpdateUsersController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })
}

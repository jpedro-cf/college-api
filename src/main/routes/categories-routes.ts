import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { FastifyInstance } from 'fastify'
import { makeAuthUseCase } from '../factories/use-cases/AuthUseCasesFactory'
import {
    makeCreateCategoryController,
    makeDeleteCategoryController,
    makeGetCategoriesController,
    makeGetCategoryByIDController,
    makeUpdateCategoryController
} from '../factories/controllers/CategoriesControllersFactory'

export default function categoriesRoutes(app: FastifyInstance) {
    const adminPrehandler = new RolesPreHandler(['admin', 'manager'], makeAuthUseCase())
    const usersPreHandler = new RolesPreHandler(['admin', 'student', 'editor', 'manager'], makeAuthUseCase())

    app.post('/api/categories', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeCreateCategoryController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })
    app.get('/api/categories', async (req, res) => {
        const controller = makeGetCategoriesController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })

    app.get('/api/categories/:id', async (req, res) => {
        const controller = makeGetCategoryByIDController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })

    app.delete(
        '/api/categories/:id',
        { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
        async (req, res) => {
            const controller = makeDeleteCategoryController()
            const { statusCode, body } = await controller.handle(req)

            return res.code(statusCode).send(body)
        }
    )

    app.put('/api/categories/:id', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeUpdateCategoryController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })
}

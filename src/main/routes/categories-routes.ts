import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { FastifyInstance } from 'fastify'
import { makeAuthUseCase } from '../factories/use-cases/AuthUseCasesFactory'
import { makeCreateCategoryController } from '../factories/controllers/CategoriesControllersFactory'

export default function categoriesRoutes(app: FastifyInstance) {
    const adminPrehandler = new RolesPreHandler(['admin'], makeAuthUseCase())

    app.post('/api/categories', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeCreateCategoryController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })
}

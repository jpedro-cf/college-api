import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { FastifyInstance } from 'fastify'
import { makeAuthUseCase } from '../factories/use-cases/AuthUseCasesFactory'
import { makeCreateAnswerController } from '../factories/controllers/AnswersControllersFactory'

export default function answersRoutes(app: FastifyInstance) {
    const usersPreHandler = new RolesPreHandler(['admin', 'student', 'editor', 'manager'], makeAuthUseCase())

    app.post('/api/answers', { preHandler: usersPreHandler.handle.bind(usersPreHandler) }, async (req, res) => {
        const controller = makeCreateAnswerController()
        const { statusCode, body } = await controller.handle(req)
        res.code(statusCode).send(body)
    })
}

import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { FastifyInstance } from 'fastify'
import { makeAuthUseCase } from '../factories/use-cases/AuthUseCasesFactory'
import {
    makeCreateAnswerController,
    makeGetAnswersByIDController,
    makeGetAnswersController,
    makePerformanceController
} from '../factories/controllers/AnswersControllersFactory'

export default function answersRoutes(app: FastifyInstance) {
    const usersPreHandler = new RolesPreHandler(['admin', 'student', 'editor', 'manager'], makeAuthUseCase())

    app.post('/api/answers', { preHandler: usersPreHandler.handle.bind(usersPreHandler) }, async (req, res) => {
        const controller = makeCreateAnswerController()
        const { statusCode, body } = await controller.handle(req)
        res.code(statusCode).send(body)
    })

    app.get('/api/answers', { preHandler: usersPreHandler.handle.bind(usersPreHandler) }, async (req, res) => {
        const controller = makeGetAnswersController()
        const { statusCode, body } = await controller.handle(req)
        res.code(statusCode).send(body)
    })

    app.get('/api/answers/:id', { preHandler: usersPreHandler.handle.bind(usersPreHandler) }, async (req, res) => {
        const controller = makeGetAnswersByIDController()
        const { statusCode, body } = await controller.handle(req)
        res.code(statusCode).send(body)
    })

    app.get(
        '/api/answers/performance',
        { preHandler: usersPreHandler.handle.bind(usersPreHandler) },
        async (req, res) => {
            const controller = makePerformanceController()
            const { statusCode, body } = await controller.handle(req)
            res.code(statusCode).send(body)
        }
    )
}

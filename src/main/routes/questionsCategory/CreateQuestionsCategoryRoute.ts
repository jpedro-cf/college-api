import { CreateQuestionsCategoryUseCase } from '@/application/categories/CreateQuestionsCategoryUseCase'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'
import { CreateQuestionsCategoryController } from '@/presentation/controllers/categories/CreateQuestionsCategoryController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const CreateQuestionsCategoryRoute: RouteHandlerMethod = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const questionsCategoryRepository = new DbQuestionsCategoryRepository()

    const createQuestionsCategory = new CreateQuestionsCategoryUseCase(questionsCategoryRepository)

    const controller = new CreateQuestionsCategoryController(createQuestionsCategory)

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

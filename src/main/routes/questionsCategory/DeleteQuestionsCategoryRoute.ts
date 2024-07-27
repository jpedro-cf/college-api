import { DeleteQuestionsCategoryUseCase } from '@/application/categories/DeleteQuestionsCategoryUseCase'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'
import { DeleteQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/DeleteQuestionsCategoryController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const DeleteQuestionsCategoryRoute: RouteHandlerMethod = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const questionsCategoryRepository = new DbQuestionsCategoryRepository()
    const deleteCategory = new DeleteQuestionsCategoryUseCase(questionsCategoryRepository)

    const controller = new DeleteQuestionsCategoryController(deleteCategory)

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

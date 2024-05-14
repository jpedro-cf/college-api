import { GetQuestionsCategoryByIdUseCase } from '@/application/questionsCategories/GetQuestionsCategoryByIDUseCase'
import { GetQuestionsCategoryBySlugUseCase } from '@/application/questionsCategories/GetQuestionsCategoryBySlugUseCase'
import { UpdateQuestionsCategoryUseCase } from '@/application/questionsCategories/UpdateQuestionsCategoryUseCase'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbQuestionsCategoryRepository'
import { UpdateQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/UpdateQuestionsCategoryController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const UpdateQuestionsCategoryRoute: RouteHandlerMethod = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const repository = new DbQuestionsCategoryRepository()
    const getByID = new GetQuestionsCategoryByIdUseCase(repository)
    const getBySlug = new GetQuestionsCategoryBySlugUseCase(repository)
    const update = new UpdateQuestionsCategoryUseCase(repository)

    const controller = new UpdateQuestionsCategoryController(getBySlug, getByID, update)

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

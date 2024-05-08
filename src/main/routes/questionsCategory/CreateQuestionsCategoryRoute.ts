import { CreateQuestionsCategoryUseCase } from '@/application/questionsCategories/CreateQuestionsCategoryUseCase'
import { GetQuestionsCategoryBySlugUseCase } from '@/application/questionsCategories/GetQuestionsCategoryBySlugUseCase'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbQuestionsCategoryRepository'
import { CreateQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/CreateQuestionsCategoryController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const CreateQuestionsCategoryRoute: RouteHandlerMethod = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const questionsCategoryRepository = new DbQuestionsCategoryRepository()

    const getCategoryBySlug = new GetQuestionsCategoryBySlugUseCase(questionsCategoryRepository)
    const createQuestionsCategory = new CreateQuestionsCategoryUseCase(questionsCategoryRepository)

    const controller = new CreateQuestionsCategoryController(getCategoryBySlug, createQuestionsCategory)

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

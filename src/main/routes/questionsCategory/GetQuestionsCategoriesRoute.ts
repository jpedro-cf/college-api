import { GetQuestionsCategoryUseCase } from '@/application/categories/GetQuestionsCategoryUseCase'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'
import { GetQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/GetQuestionsCategoryController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const GetQuestionsCategoryRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const categoriesRepository = new DbQuestionsCategoryRepository()
    const getCategoriesUseCase = new GetQuestionsCategoryUseCase(categoriesRepository)
    const controller = new GetQuestionsCategoryController(getCategoriesUseCase)

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

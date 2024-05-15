import { GetUsersUseCase } from '@/application/users/GetUsersUseCase'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { GetUsersController } from '@/presentation/controllers/users/GetUsersController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const GetUsersRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const repository = new DbUsersRepository()
    const getUsers = new GetUsersUseCase(repository)

    const controller = new GetUsersController(getUsers)

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

import { GetByTokenUseCase } from '@/application/auth/GetByTokenUseCase'
import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { CurrentUserInfoController } from '@/presentation/controllers/auth/CurrentUserInfoController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const CurrentUserRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const usersRepository = new DbUsersRepository()
    const jwt = new JWTAdapter()
    const getByTokenUseCase = new GetByTokenUseCase(usersRepository, jwt)
    const controller = new CurrentUserInfoController(getByTokenUseCase)

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

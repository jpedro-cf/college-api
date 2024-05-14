import { GetByTokenUseCase } from '@/application/auth/GetByTokenUseCase'
import { UpdateUserUseCase } from '@/application/users/UpdateUserUseCase'
import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { UpdateUserController } from '@/presentation/controllers/users/UpdateUserController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const UpdateUserRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const usersRepository = new DbUsersRepository()
    const jwt = new JWTAdapter()

    const getByToken = new GetByTokenUseCase(usersRepository, jwt)
    const updateUser = new UpdateUserUseCase(usersRepository)

    const controller = new UpdateUserController(getByToken, updateUser)

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

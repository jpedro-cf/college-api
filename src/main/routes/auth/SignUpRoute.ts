import { SignUpUseCase } from '@/application/auth/SignUpUseCase'
import { BcryptAdapter } from '@/infra/cryptography/Bcrypt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const SignUpRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const hasher = new BcryptAdapter(8)
    const usersRepository = new DbUsersRepository()

    const signUpUseCase = new SignUpUseCase(usersRepository, hasher)

    const controller = new SignUpController(signUpUseCase)

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
    }
}

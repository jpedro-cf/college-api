import { AuthenticationUseCase } from '@/application/auth/AuthenticationUseCase'
import { SignUpUseCase } from '@/application/auth/SignUpUseCase'
import { BcryptAdapter } from '@/infra/cryptography/Bcrypt'
import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const SignUpRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const hasher = new BcryptAdapter(8)
    const jwt = new JWTAdapter()
    const usersRepository = new DbUsersRepository()

    const signUpUseCase = new SignUpUseCase(usersRepository, hasher)
    const authentication = new AuthenticationUseCase(usersRepository, hasher, jwt)

    const controller = new SignUpController(signUpUseCase, authentication)

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        if (httpResponse.cookies) {
            reply.setCookie('access_token', httpResponse.cookies, {
                path: '/',
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            })
        }
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send(httpResponse.body.message)
    }
}

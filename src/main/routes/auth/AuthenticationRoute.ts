import { AuthenticationUseCase } from '@/application/auth/AuthenticationUseCase'
import { BcryptAdapter } from '@/infra/cryptography/Bcrypt'
import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { AuthenticationController } from '@/presentation/controllers/auth/AuthenticationController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const AuthenticationRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const usersRepository = new DbUsersRepository()
    const hash = new BcryptAdapter(8)
    const jwt = new JWTAdapter()

    const authenticationUseCase = new AuthenticationUseCase(usersRepository, hash, jwt)

    const controller = new AuthenticationController(authenticationUseCase)

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        if (httpResponse.cookies) {
            console.log('COOKIES:' + httpResponse.cookies)
            reply.setCookie('access_token', httpResponse.cookies, {
                path: '/',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true
            })
        }
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
    }
}

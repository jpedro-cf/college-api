import { SignUpUseCase } from '@/application/auth/SignUpUseCase'
import { GetDiscordUserByUserNameUseCase } from '@/application/discord/users/GetUserByUserNameUseCase'
import { ConfirmVerificationUseCase } from '@/application/discord/verification/ConfirmVerificationUseCase'
import { DenyVerificationUseCase } from '@/application/discord/verification/DenyVerificationUseCase'
import { SendVerificationUseCase } from '@/application/discord/verification/SendVerificationUseCase'
import { BcryptAdapter } from '@/infra/cryptography/Bcrypt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { client } from '@/infra/discord/client'
import { DiscordUsersService } from '@/infra/discord/users/DiscordUsersService'
import { DiscordVerificationService } from '@/infra/discord/verification/DiscordVerificationService'
import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export const SignUpRoute: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const hasher = new BcryptAdapter(8)
    const usersRepository = new DbUsersRepository()

    const discordUserService = new DiscordUsersService()
    const getDiscordByUsername = new GetDiscordUserByUserNameUseCase(discordUserService)
    const confirmVerification = new ConfirmVerificationUseCase(usersRepository)
    const denyVerification = new DenyVerificationUseCase(usersRepository)
    const discordVerification = new DiscordVerificationService(client, confirmVerification, denyVerification)
    const sendVerificationUseCase = new SendVerificationUseCase(discordVerification)

    const signUpUseCase = new SignUpUseCase(usersRepository, hasher)

    const controller = new SignUpController(signUpUseCase, getDiscordByUsername, sendVerificationUseCase)

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        reply.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
        reply.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
    }
}

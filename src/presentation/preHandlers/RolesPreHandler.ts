import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { IPreHandler } from '@/interfaces/presentation/preHandler'
import { FastifyReply } from 'fastify'
import { FastifyRequest } from 'fastify/types/request'

export class RolesPreHandler implements IPreHandler {
    constructor(private readonly roles: string[], private readonly authentication: IAuthentication) {}

    async handle(request: FastifyRequest, reply: FastifyReply, done): Promise<void> {
        try {
            const { access_token } = request.cookies
            if (!access_token) {
                reply.code(400)
                reply.send({ message: 'Token é obrigatório.' })
                done()
            }
            const user = await this.authentication.verifySession(access_token)
            if (!user) {
                reply.code(400)
                reply.send({ message: 'Nenhum usuário encontrado com esse token.' })
                done()
            }
            if (!this.roles.some((r) => user.roles.includes(r))) {
                reply.code(401)
                reply.send({ message: 'Você não tem permissão para realizar essa operação.' })
                done()
            }
        } catch (error) {
            reply.code(500)
            reply.send(error)
            done()
        }
    }
}

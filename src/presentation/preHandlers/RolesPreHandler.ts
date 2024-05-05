import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { IPreHandler } from '@/interfaces/presentation/preHandler'
import { FastifyReply } from 'fastify'
import { FastifyRequest } from 'fastify/types/request'

export class RolesPreHandler implements IPreHandler {
    constructor(private readonly roles: string[], private readonly getByToken: IGetByToken) {}

    async handle(request: FastifyRequest, reply: FastifyReply, done): Promise<void> {
        try {
            const { access_token } = request.cookies
            if (!access_token) {
                reply.code(400)
                reply.send('Token é obrigatório.')
                done()
            }
            const user = await this.getByToken.get(access_token)

            if (!user) {
                reply.code(400)
                reply.send('Nenhum usuário encontrado com esse token.')
                done()
            }

            for (const role in this.roles) {
                if (!user.roles.includes(this.roles[role])) {
                    reply.code(400)
                    reply.send('Você não tem permissão para realizar essa operação.')
                    done()
                }
            }
        } catch (error) {
            reply.code(500)
            reply.send(error)
            done()
        }
    }
}

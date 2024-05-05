import { FastifyReply, FastifyRequest } from 'fastify'

export interface IPreHandler {
    handle(request: FastifyRequest, reply: FastifyReply, done): Promise<void>
}

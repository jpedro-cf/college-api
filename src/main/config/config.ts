import fastifyCookie from '@fastify/cookie'
import { FastifyInstance } from 'fastify'
import { env } from './env'
import multipart from '@fastify/multipart'

export const appConfig = (app: FastifyInstance) => {
    const cookieOptions = {
        secret: env.cookieSecret,
        parseOptions: {},
        setOptions: {
            httpOnly: true
        }
    }
    app.register(fastifyCookie, cookieOptions)
    app.register(multipart, { attachFieldsToBody: true })

    app.addHook('onRequest', async (request, reply) => {
        console.log('testeee')
        reply.header('Access-Control-Allow-Origin', '*')
        reply.header('Access-Control-Allow-Credentials', true)
        reply.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Slug, X-UID'
        )
        reply.header('Access-Control-Allow-Methods', 'OPTIONS, POST, PUT, PATCH, GET, DELETE')
        if (request.method === 'OPTIONS') {
            reply.send()
        }
    })
}

import fastifyCookie from '@fastify/cookie'
import { FastifyInstance } from 'fastify'
import { env } from './env'

export const corsConfig = (app: FastifyInstance) => {
    const cookieOptions = {
        secret: env.cookieSecret, // Required, used for cookie signing
        parseOptions: {}, // Optional, options for the cookie parsing library (cookie package)
        setOptions: {
            httpOnly: true // Optional, cookie is only accessible through HTTP(S) headers
        }
    }
    app.register(fastifyCookie, cookieOptions)
    app.addHook('onRequest', async (request, reply) => {
        reply.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
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

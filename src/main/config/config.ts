import fastifyCookie from '@fastify/cookie'
import { FastifyInstance } from 'fastify'
import { env } from './env'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'path'

export const appConfig = (app: FastifyInstance) => {
    const cookieOptions = {
        secret: env.cookieSecret,
        parseOptions: {},
        setOptions: {
            httpOnly: true
        }
    }
    app.register(fastifyCookie, cookieOptions)
    app.register(multipart, { throwFileSizeLimit: true, limits: { files: 2, fileSize: 0.5 * 1024 * 1024 } })
    app.register(fastifyStatic, {
        root: process.cwd() + '/public/images', // Directory containing the files to serve
        prefix: '/public/images' // Prefix for the static file routes
    })

    app.addHook('onRequest', async (request, reply) => {
        const allowedOrigins = ['http://localhost:5173']

        const origin = request.headers.origin
        if (allowedOrigins.includes(origin)) {
            reply.header('Access-Control-Allow-Origin', origin)
        }
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

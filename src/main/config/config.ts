import fastifyCookie from '@fastify/cookie'
import { FastifyInstance } from 'fastify'
import { env } from './env'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import cors from '@fastify/cors'

export const appConfig = (app: FastifyInstance) => {
    const cookieOptions = {
        secret: env.cookieSecret,
        parseOptions: {},
        setOptions: {
            httpOnly: true
        }
    }

    app.register(cors, {
        origin: (origin, cb) => {
            const allowedOrigins = ['http://localhost:5173', origin]
            if (allowedOrigins.includes(origin)) {
                cb(null, true)
            } else {
                cb(new Error('Not allowed by CORS'), true)
            }
        },
        credentials: true
    })
    app.register(fastifyCookie, cookieOptions)
    app.register(multipart, { throwFileSizeLimit: true, limits: { files: 2, fileSize: 0.5 * 1024 * 1024 } })
    app.register(fastifyStatic, {
        root: process.cwd() + '/public/images', // Directory containing the files to serve
        prefix: '/public/images' // Prefix for the static file routes
    })
}

import fastify, { FastifyInstance } from 'fastify'
import { env } from './config/env'
import { corsConfig } from './config/config'
import routesConfig from './config/routes'
import mongoose from 'mongoose'

const app: FastifyInstance = fastify({ logger: true })
corsConfig(app)
routesConfig(app)

const start = () => {
    mongoose.connect(env.mongoUrl).then(() => {
        app.listen({ port: env.port }, () => console.log('Server running'))
    })
}
start()

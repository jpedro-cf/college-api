import fastify, { FastifyInstance } from 'fastify'
import { env } from './config/env'
import { corsConfig } from './config/config'
import routesConfig from './config/routes'
import mongoose from 'mongoose'
import { setupDiscord } from '@/infra/discord/client'

const app: FastifyInstance = fastify({ logger: true })
corsConfig(app)
routesConfig(app)
export { app }

const start = () => {
    mongoose.connect(env.mongoUrl).then(() => {
        app.listen({ port: env.port }, () => {
            console.log('Server running')
            setupDiscord()
        })
    })
}
start()

import fastify, { FastifyInstance } from 'fastify'
import { env } from './config/env'
import { appConfig } from './config/config'
import routesConfig from './config/routes'
import mongoose from 'mongoose'

export const app: FastifyInstance = fastify({ logger: false })
appConfig(app)
routesConfig(app)

const start = () => {
    mongoose.connect(env.mongoUrl).then(() => {
        mongoose.set('strictPopulate', false)
        app.listen({ port: env.port }, () => {
            console.log('Server running')
        })
    })
}
start()

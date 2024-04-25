import { FastifyInstance } from 'fastify'

export const corsConfig = (app: FastifyInstance) => {
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

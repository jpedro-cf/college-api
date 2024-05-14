import { FastifyInstance } from 'fastify'
import { SignUpRoute } from '../routes/auth/SignUpRoute'
import { AuthenticationRoute } from '../routes/auth/AuthenticationRoute'
import { CurrentUserRoute } from '../routes/auth/CurrentUserInfoRoute'
import { CreateQuestionsCategoryRoute } from '../routes/questionsCategory/CreateQuestionsCategoryRoute'
import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { GetByTokenUseCase } from '@/application/auth/GetByTokenUseCase'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { GetQuestionsCategoryRoute } from '../routes/questionsCategory/GetQuestionsCategoriesRoute'
import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { UpdateQuestionsCategoryRoute } from '../routes/questionsCategory/UpdateQuestionsCategoryRoute'
// import fs from 'fs'
// import { pipeline } from 'stream'
// import util from 'util'
// import path from 'path'
// import { GetQuestionsCategoryRoute } from '../routes/questionsCategory/GetQuestionsCategoriesRoute'
// const pump = util.promisify(pipeline)

export default function routesConfig(app: FastifyInstance) {
    app.post('/api/register', {}, SignUpRoute)
    app.post('/api/login', {}, AuthenticationRoute)
    app.get('/api/current_user', {}, CurrentUserRoute)

    // app.post('/api/upload', {}, async (req, reply) => {
    //     try {
    //         if (!fs.existsSync('./public/images')) {
    //             fs.mkdirSync('./public/images')
    //         }

    //         // const data = (await req.file({ limits: { fileSize: 10 } })) as any
    //         // data.file.on('limit', () => {
    //         //     console.log('passou')
    //         // })
    //         // await pump(data.fields.imagem.file, fs.createWriteStream('./uploads/' + 'namee2.jpg'))
    //         const parts = req.parts()
    //         for await (const part of parts) {
    //             if (part.type === 'file') {
    //                 await pump(part.file, fs.createWriteStream(process.cwd() + '/public/images/' + part.filename))
    //                 if (part.file.truncated) {
    //                     reply.status(500).send('error')
    //                 }
    //             } else {
    //                 // part.type === 'field
    //                 console.log(part.value)
    //             }
    //         }
    //         reply.send()
    //         return { message: 'files uploaded' }
    //     } catch (error) {
    //         return error
    //     }
    // })
    // app.route({
    //     method: 'GET',
    //     url: '/api/questions_category',
    //     schema: {},
    //     (req, res) => {

    //     }
    // })

    const usersRepository = new DbUsersRepository()
    const jwt = new JWTAdapter()
    const adminPrehandler = new RolesPreHandler(['admin'], new GetByTokenUseCase(usersRepository, jwt))
    const studentPrehandler = new RolesPreHandler(['student', 'admin'], new GetByTokenUseCase(usersRepository, jwt))

    app.post(
        '/api/questions_category',
        { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
        CreateQuestionsCategoryRoute
    )
    app.put(
        '/api/questions_category',
        { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
        UpdateQuestionsCategoryRoute
    )
    app.get(
        '/api/questions_category',
        { preHandler: studentPrehandler.handle.bind(studentPrehandler) },
        GetQuestionsCategoryRoute
    )
}

import { FastifyInstance } from 'fastify'
import authRoutes from '../routes/auth-routes'
import categoriesRoutes from '../routes/categories-routes'
import questionsRoutes from '../routes/questions-routes'
import usersRoutes from '../routes/users-routes'
export default function routesConfig(app: FastifyInstance) {
    authRoutes(app)
    categoriesRoutes(app)
    questionsRoutes(app)
    usersRoutes(app)
    // app.post('/api/register', {}, SignUpRoute)
    // app.post('/api/login', {}, AuthenticationRoute)
    // app.get('/api/current_user', {}, CurrentUserRoute)

    // app.put('/api/users', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, UpdateUserRoute)
    // app.get('/api/users', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, GetUsersRoute)

    // app.post(
    //     '/api/questions_category',
    //     { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
    //     CreateQuestionsCategoryRoute
    // )
    // app.put(
    //     '/api/questions_category',
    //     { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
    //     UpdateQuestionsCategoryRoute
    // )
    // app.delete(
    //     '/api/questions_category',
    //     { preHandler: adminPrehandler.handle.bind(adminPrehandler) },
    //     DeleteQuestionsCategoryRoute
    // )
    // app.get(
    //     '/api/questions_category',
    //     { preHandler: studentPrehandler.handle.bind(studentPrehandler) },
    //     GetQuestionsCategoryRoute
    // )
}

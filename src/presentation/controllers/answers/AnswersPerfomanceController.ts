import { IGetAnswersPerfomance } from '@/interfaces/domain/useCases/answers/GetAnswersPerfomance'
import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { badRequest, ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { AuthenticationError, MissingParamError } from '@/utils/customErrors'

export class AnswersPerfomanceController implements IController {
    constructor(
        private readonly getPerfomance: IGetAnswersPerfomance,
        private readonly authentication: IAuthentication
    ) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { access_token } = httpRequest.cookies
            if (!access_token) {
                return badRequest(new MissingParamError('Sessão inválida.'))
            }

            const user = await this.authentication.verifySession(access_token)
            if (!user) {
                return unauthorized(new AuthenticationError('Sessão inválida.'))
            }

            const { date } = httpRequest.query

            const perfomance = await this.getPerfomance.execute(user.id, new Date(date))

            return ok(perfomance)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

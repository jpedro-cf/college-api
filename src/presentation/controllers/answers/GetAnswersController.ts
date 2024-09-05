import { IGetAnswers } from '@/interfaces/domain/useCases/answers/GetAnswersUseCase'
import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { AuthenticationError } from '@/utils/customErrors'

export class GetAnswersController implements IController {
    constructor(private readonly authentication: IAuthentication, private readonly getAnswers: IGetAnswers) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { access_token } = httpRequest.cookies

            if (!access_token) {
                return unauthorized(new AuthenticationError('Sessão inválida.'))
            }

            const user = await this.authentication.verifySession(access_token)

            if (!user) {
                return unauthorized(new AuthenticationError('Sessão inválida.'))
            }

            const answers = await this.getAnswers.get({
                user_id: user.id,
                search: httpRequest.query.search ?? '',
                order: httpRequest.query.order ?? 'desc',
                per_page: httpRequest.query.per_page ?? 9,
                current_page: httpRequest.query.current_page ?? 1
            })
            return ok(answers)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

import { IGetAnswers } from '@/interfaces/domain/useCases/answers/GetAnswersUseCase'
import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { IGetQuestions } from '@/interfaces/domain/useCases/questions/GetQuestions'
import { badRequest, ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { AuthenticationError, InvalidParamError, NotFoundError } from '@/utils/customErrors'

export class GetAnswerByIDController implements IController {
    constructor(private readonly authentication: IAuthentication, private readonly getAnswers: IGetAnswers) {}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.params
            const { access_token } = httpRequest.cookies

            if (!id) {
                return badRequest(new InvalidParamError('ID é obrigatório.'))
            }

            if (!access_token) {
                return unauthorized(new AuthenticationError('Sessão inválida.'))
            }

            const answer = await this.getAnswers.getByID(id)

            const user = await this.authentication.verifySession(access_token)

            if (!user) {
                return unauthorized(new AuthenticationError('Sessão inválida.'))
            }

            if (!answer) {
                return badRequest(new NotFoundError('Resposta não encontrada.'))
            }

            if (answer.user != user.id) {
                return unauthorized(new Error('Você não pode visualizar essa resposta.'))
            }

            return ok(answer)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

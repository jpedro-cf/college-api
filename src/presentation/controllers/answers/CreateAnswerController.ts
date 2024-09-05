import { ICreateAnswer } from '@/interfaces/domain/useCases/answers/CreateAnswer'
import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { badRequest, ok } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { InvalidParamError } from '@/utils/customErrors'

export class CreateAnswerController implements IController {
    constructor(private readonly auth: IAuthentication, private readonly createAnswer: ICreateAnswer) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { question_id, answer_id } = httpRequest.body
            const { access_token } = httpRequest.cookies

            if (!question_id || !answer_id) {
                return badRequest(new InvalidParamError('Questão e resposta são obrigatórios.'))
            }

            const user = await this.auth.verifySession(access_token)

            const answer = await this.createAnswer.execute({ answer_id, question_id, user_id: user.id })

            return ok(answer)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

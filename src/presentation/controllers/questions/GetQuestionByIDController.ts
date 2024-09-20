import { IGetCategories } from '@/interfaces/domain/useCases/categories/GetCategories'
import { IGetQuestions } from '@/interfaces/domain/useCases/questions/GetQuestions'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { MissingParamError } from '@/utils/customErrors'

export class GetQuestionByIDController implements IController {
    constructor(private readonly getQuestions: IGetQuestions) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.params

            if (!id) {
                return badRequest(new MissingParamError('ID é obrigatório.'))
            }
            const question = await this.getQuestions.byId(id)
            return ok(question)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

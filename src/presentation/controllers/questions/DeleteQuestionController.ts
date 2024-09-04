import { IDeleteQuestion } from '@/interfaces/domain/useCases/questions/DeleteQuestion'
import { badRequest, noContent } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { InvalidParamError } from '@/utils/customErrors'

export class DeleteQuestionController implements IController {
    constructor(private readonly deleteQuestion: IDeleteQuestion) {}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.params

            if (!id) {
                return badRequest(new InvalidParamError('ID é obrigatório.'))
            }

            await this.deleteQuestion.execute(id)

            return noContent()
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

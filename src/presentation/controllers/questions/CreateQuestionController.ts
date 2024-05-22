import { ICreateQuestion } from '@/interfaces/domain/useCases/questions/CreateQuestion'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class CreateQuestionController implements IController {
    constructor(private readonly createQuestion: ICreateQuestion) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            throw new Error('Method not implemented.')
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

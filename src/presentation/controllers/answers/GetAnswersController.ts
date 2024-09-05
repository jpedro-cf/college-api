import { IGetAnswers } from '@/interfaces/domain/useCases/answers/GetAnswersUseCase'
import { ok } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class GetAnswersController implements IController {
    constructor(private readonly getAnswers: IGetAnswers) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const answers = await this.getAnswers.get({
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

import { IGetQuestionsCategories } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'

export class GetQuestionsCategoryController implements IController {
    constructor(private readonly getQuestionsCategories: IGetQuestionsCategories) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { search, order } = httpRequest.body

            const categories = await this.getQuestionsCategories.get({ search, order })
            return ok(categories)
        } catch (error) {
            return serverError(error)
        }
    }
}

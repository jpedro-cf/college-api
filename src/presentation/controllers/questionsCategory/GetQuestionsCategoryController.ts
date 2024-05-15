import { IGetQuestionsCategories } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'

export class GetQuestionsCategoryController implements IController {
    constructor(private readonly getQuestionsCategories: IGetQuestionsCategories) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const categories = await this.getQuestionsCategories.get({
                search: httpRequest.query.search ?? '',
                order: httpRequest.query.order ?? 'desc',
                per_page: httpRequest.query.per_page ?? 9,
                current_page: httpRequest.query.current_page ?? 1
            })
            return ok(categories)
        } catch (error) {
            return serverError(error)
        }
    }
}

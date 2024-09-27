import { IGetCategories } from '@/interfaces/domain/useCases/categories/GetCategories'
import { IGetQuestions } from '@/interfaces/domain/useCases/questions/GetQuestions'
import { ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class GetQuestionsController implements IController {
    constructor(private readonly getQuestions: IGetQuestions) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const questions = await this.getQuestions.execute({
                search: httpRequest.query.search ?? '',
                order: httpRequest.query.order ?? 'desc',
                per_page: httpRequest.query.per_page ?? 9,
                category: httpRequest.query.category ?? null,
                current_page: httpRequest.query.current_page ?? 1
            })
            return ok(questions)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

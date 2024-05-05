import { ICreateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/CreateQuestionsCategory'
import { IGetQuestionsCategoryBySlug } from '@/interfaces/domain/useCases/questionsCategory/GetBySlug'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { convertToSlug } from '@/utils/converToSlug'

export class CreateQuestionsCategoryController implements IController {
    constructor(
        private readonly getCategoryBySlug: IGetQuestionsCategoryBySlug,
        private readonly createCategory: ICreateQuestionsCategory
    ) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { title, image } = httpRequest.body

            const slug = convertToSlug(title)
            const exists = await this.getCategoryBySlug.get(slug)
            console.log(exists)
            if (exists) {
                return badRequest(new Error('Categoria já existe.'))
            }

            const created = await this.createCategory.create(title, slug, image)

            return ok(created)
        } catch (error) {
            return serverError(error)
        }
    }
}

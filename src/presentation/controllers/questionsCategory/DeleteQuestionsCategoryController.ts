import { IDeleteQuestionsCategory } from '@/interfaces/domain/useCases/categories/DeleteCategory'
import { badRequest, ok } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class DeleteQuestionsCategoryController implements IController {
    constructor(private readonly deleteCategory: IDeleteQuestionsCategory) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.query

            if (!id) {
                return badRequest(new Error('ID da categoria é obrigatório.'))
            }

            const deleted = await this.deleteCategory.delete(id)

            return ok(deleted)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

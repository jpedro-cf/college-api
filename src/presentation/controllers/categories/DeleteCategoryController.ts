import { IDeleteCategory } from '@/interfaces/domain/useCases/categories/DeleteCategory'
import { badRequest, ok } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class DeleteCategoryController implements IController {
    constructor(private readonly deleteCategory: IDeleteCategory) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.params

            if (!id) {
                return badRequest(new Error('ID da categoria é obrigatório.'))
            }

            const deleted = await this.deleteCategory.execute(id)

            return ok(deleted)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

import { IGetCategoryByID } from '@/interfaces/domain/useCases/categories/GetByID'
import { badRequest, ok } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { MissingParamError, NotFoundError } from '@/utils/customErrors'

export class GetCategoryByIDController implements IController {
    constructor(private readonly getCategoryByID: IGetCategoryByID) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.params
            if (!id) {
                return badRequest(new MissingParamError('ID é obrigatório.'))
            }

            const category = await this.getCategoryByID.execute(id)
            if (!category) {
                return badRequest(new NotFoundError('Categoria não encontrada.'))
            }

            return ok(category)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

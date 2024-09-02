import fs from 'fs'
import { pipeline } from 'stream'
import util from 'util'
import path from 'path'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse, IMultiPartFile } from '@/interfaces/presentation/http'
import { IUpdateCategory } from '@/interfaces/domain/useCases/categories/UpdateCategory'
import { convertToSlug } from '@/utils/converToSlug'
import { IGetCategoryByID } from '@/interfaces/domain/useCases/categories/GetByID'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class UpdateCategoryController implements IController {
    constructor(private readonly getCategoryByID: IGetCategoryByID, private readonly updateCategory: IUpdateCategory) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { title } = httpRequest.body
            const { id } = httpRequest.params

            const query: any = {}

            if (!id) {
                return badRequest(new Error('ID da categoria é obrigatório'))
            }

            const category = await this.getCategoryByID.execute(id)

            if (!category) {
                return badRequest(new Error('Categoria não existe.'))
            }

            if (title) {
                const newSlug = convertToSlug(title)

                query.title = title
                query.slug = newSlug
            }

            const updated = await this.updateCategory.execute(id, query)
            return ok(updated)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

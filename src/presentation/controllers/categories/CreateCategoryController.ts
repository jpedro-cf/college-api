import fs from 'fs'
import { pipeline } from 'stream'
import util from 'util'
import path from 'path'
import { ICreateCategory } from '@/interfaces/domain/useCases/categories/CreateCategory'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse, IMultiPartFile } from '@/interfaces/presentation/http'
import { convertToSlug } from '@/utils/converToSlug'
import { MissingParamError } from '@/utils/customErrors'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class CreateCategoryController implements IController {
    constructor(private readonly createCategory: ICreateCategory) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { image, title } = httpRequest.body

            if (!title) {
                return badRequest(new Error('Title é obrigatório.'))
            }

            const slug = convertToSlug(title)

            const created = await this.createCategory.execute(title, slug)

            return ok(created)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

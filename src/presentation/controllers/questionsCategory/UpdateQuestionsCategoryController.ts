import fs from 'fs'
import { pipeline } from 'stream'
import util from 'util'
import path from 'path'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse, IMultiPartFile } from '@/interfaces/presentation/http'
import { IUpdateQuestionsCategory } from '@/interfaces/domain/useCases/categories/UpdateQuestionsCategory'
import { convertToSlug } from '@/utils/converToSlug'
import { IGetQuestionsCategoryByID } from '@/interfaces/domain/useCases/questionsCategory/GetByID'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

interface IHandleFormDataResponse {
    title?: string
    image?: string
    id: string
}

export class UpdateQuestionsCategoryController implements IController {
    constructor(
        private readonly getCategoryByID: IGetQuestionsCategoryByID,
        private readonly updateCategory: IUpdateQuestionsCategory
    ) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { image, title, id } = await this.handleMultpartForm(httpRequest)

            if (!id) {
                return badRequest(new Error('ID da categoria é obrigatório'))
            }

            const category = await this.getCategoryByID.get(id)

            if (!category) {
                return badRequest(new Error('Categoria não existe.'))
            }

            if (title) {
                const newSlug = convertToSlug(title)

                category.title = title
                category.slug = newSlug
            }

            category.image = image ? image : category.image

            const { createdAt, updatedAt, ...query } = category

            const updated = await this.updateCategory.update(query)
            return ok(updated)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
    async handleMultpartForm(httpRequest: IHttpRequest): Promise<IHandleFormDataResponse> {
        try {
            const pump = util.promisify(pipeline)

            const parts = httpRequest.parts()

            if (!parts) {
                throw new Error('A request deve ser um multpart form.')
            }
            let image = null
            let title = null
            let id = null

            for await (const value of parts) {
                const part = value as IMultiPartFile
                if (part.fieldname === 'image') {
                    image = '/public/images/' + part.filename
                    await pump(part.file, fs.createWriteStream('./public/images/' + part.filename))
                    if (part.file.truncated) {
                        throw new Error('Arquivo é muito grande.')
                    }
                } else if (part.fieldname === 'title') {
                    title = part.value
                } else if (part.fieldname === 'id') {
                    id = part.value
                }
            }
            return { image, title, id }
        } catch (error) {
            throw new Error(error)
        }
    }
}

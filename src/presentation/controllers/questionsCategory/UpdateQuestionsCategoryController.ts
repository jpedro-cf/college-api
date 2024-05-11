import fs from 'fs'
import { pipeline } from 'stream'
import util from 'util'
import path from 'path'
import { IGetQuestionsCategoryBySlug } from '@/interfaces/domain/useCases/questionsCategory/GetBySlug'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse, IMultiPartFile } from '@/interfaces/presentation/http'
import { IUpdateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/UpdateQuestionsCategory'
import { convertToSlug } from '@/utils/converToSlug'

interface IHandleFormDataResponse {
    title: string
    image: string
    slug: string
    id: string
}

export class UpdateQuestionsCategoryController implements IController {
    constructor(
        private readonly getCategoryBySlug: IGetQuestionsCategoryBySlug,
        private readonly updateCategory: IUpdateQuestionsCategory
    ) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { image, title, slug, id } = await this.handleMultpartForm(httpRequest)

            if (!id) {
                return badRequest(new Error('ID da categoria é obrigatório'))
            }
            if (!slug) {
                return badRequest(new Error('Slug da categoria é obrigatório'))
            }

            const category = await this.getCategoryBySlug.get(slug)

            if (!category) {
                return badRequest(new Error('Categoria não existe.'))
            }

            if (title) {
                const newSlug = convertToSlug(title)
                const alreadyExists = await this.getCategoryBySlug.get(newSlug)
                if (alreadyExists) {
                    return badRequest(new Error('Categoria com esse título já existe.'))
                }
                category.title = title
                category.slug = newSlug
            }

            category.image = image ? image : category.image

            const { created_at, ...query } = category

            console.log(query)

            const updated = await this.updateCategory.update(query)
            return ok(updated)
        } catch (error) {
            return serverError(error)
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
            let slug = null

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
                } else if (part.fieldname === 'slug') {
                    slug = part.value
                } else if (part.fieldname === 'id') {
                    id = part.value
                }
            }
            return { image, title, slug, id }
        } catch (error) {
            throw new Error(error)
        }
    }
}

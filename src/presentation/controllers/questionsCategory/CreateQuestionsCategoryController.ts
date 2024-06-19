import fs from 'fs'
import { pipeline } from 'stream'
import util from 'util'
import path from 'path'
import { ICreateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/CreateQuestionsCategory'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse, IMultiPartFile } from '@/interfaces/presentation/http'
import { convertToSlug } from '@/utils/converToSlug'
import { MissingParamError } from '@/utils/customErrors'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

interface IHandleFormDataResponse {
    title: string
    image: string
}

export class CreateQuestionsCategoryController implements IController {
    constructor(private readonly createCategory: ICreateQuestionsCategory) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { image, title } = await this.handleMultpartForm(httpRequest)

            if (!title || !image) {
                return badRequest(new Error('Os campos "title" e "image" são obrigatórios.'))
            }

            const slug = convertToSlug(title)

            const created = await this.createCategory.create(title, slug, image)

            return ok(created)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
    async handleMultpartForm(httpRequest: IHttpRequest): Promise<IHandleFormDataResponse> {
        try {
            const pump = util.promisify(pipeline)

            const parts = httpRequest.parts()

            if (!parts) {
                throw new MissingParamError('A request deve ser um multpart form.')
            }
            let image = null
            let title = null

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
                }
            }
            return { image, title }
        } catch (error) {
            throw new Error(error)
        }
    }
}

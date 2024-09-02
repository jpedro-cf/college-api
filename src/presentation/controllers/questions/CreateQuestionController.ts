import { ICreateQuestion } from '@/interfaces/domain/useCases/questions/CreateQuestion'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class CreateQuestionController implements IController {
    constructor(private readonly createQuestion: ICreateQuestion) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { question, material, category_id, answers, correct } = httpRequest.body

            const requiredFields = ['question', 'category_id', 'answers', 'created_at', 'correct']

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new Error(`Campo [${field}] é obrigatório`))
                }
            }

            for (const answer of answers) {
                if (!answer.id || !answer.title) {
                    return badRequest(new Error('ID e titulo da resposta devem estar preenchidos.'))
                }
            }

            if (!answers.some((answer) => answer.id === correct)) {
                return badRequest(new Error('A resposta correta deve corresponder à um id de uma das respostas.'))
            }

            const created = await this.createQuestion.execute(
                { question, material, categories: [category_id], answers },
                correct
            )

            return ok(created)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

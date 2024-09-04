import { IUpdateQuestion } from '@/interfaces/domain/useCases/questions/UpdateQuestion'
import { badRequest, ok } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { InvalidParamError } from '@/utils/customErrors'

export class UpdateQuestionController implements IController {
    constructor(private readonly updateQuestion: IUpdateQuestion) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { question, material, categories, answers, correct } = httpRequest.body
            const { id } = httpRequest.params

            if (!id) {
                return badRequest(new InvalidParamError('ID da questão é obrigatório.'))
            }

            if (answers && answers.length > 0) {
                for (const answer of answers) {
                    if (!answer.id || !answer.title) {
                        return badRequest(new Error('ID e titulo da resposta devem estar preenchidos.'))
                    }
                }
            }

            if (correct && !answers.some((answer) => answer.id === correct)) {
                return badRequest(new Error('A resposta correta deve corresponder à um id de uma das respostas.'))
            }

            const updated = await this.updateQuestion.execute(id, {
                question,
                material,
                categories,
                answers,
                correct_answer_id: correct
            })

            return ok(updated)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

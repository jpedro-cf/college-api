import { IDiscordSendQuestion } from '@/interfaces/domain/useCases/discord/questions/DiscordSendQuestion'
import { ICreateQuestion } from '@/interfaces/domain/useCases/questions/CreateQuestion'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class CreateQuestionController implements IController {
    constructor(
        private readonly createQuestion: ICreateQuestion,
        private readonly sendQuestion: IDiscordSendQuestion
    ) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { question, material, category_id, answers, created_at, correct } = httpRequest.body

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

            const created = await this.createQuestion.create(
                { question, material, category_id, answers, created_at },
                correct
            )

            if (created) {
                const sent = await this.sendQuestion.send(created)
                return sent ? ok(created) : serverError(new Error('Ocorreu algum erro ao criar a questão.'))
            }
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}

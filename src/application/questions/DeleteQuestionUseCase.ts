import { IAnswersRepository } from '@/interfaces/application/repositories/AnswersRepository'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { IDeleteQuestion } from '@/interfaces/domain/useCases/questions/DeleteQuestion'
import { NotFoundError } from '@/utils/customErrors'

export class DeleteQuestionUseCase implements IDeleteQuestion {
    constructor(
        private readonly questionsRepository: IQuestionsRepository,
        private readonly answersRepository: IAnswersRepository
    ) {}
    async execute(id: string): Promise<boolean> {
        const question = await this.questionsRepository.queryOne({ id: { _equals: id } })

        if (!question) {
            throw new NotFoundError('Questão não encontrada.')
        }

        const { items: answers_with_category } = await this.answersRepository.queryMany({
            query: {
                question: { _equals: id }
            }
        })

        await Promise.all(
            answers_with_category.map(async (answer) => {
                await this.answersRepository.delete(answer.id)
            })
        )

        const deleted = await this.questionsRepository.delete(id)

        return deleted ? true : false
    }
}

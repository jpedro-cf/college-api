import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { IDeleteQuestion } from '@/interfaces/domain/useCases/questions/DeleteQuestion'
import { NotFoundError } from '@/utils/customErrors'

export class DeleteQuestionUseCase implements IDeleteQuestion {
    constructor(private readonly questionsRepository: IQuestionsRepository) {}
    async execute(id: string): Promise<boolean> {
        const question = await this.questionsRepository.queryOne({ id: { _equals: id } })

        if (!question) {
            throw new NotFoundError('Questão não encontrada.')
        }

        const deleted = await this.questionsRepository.delete(id)
        return deleted ? true : false
    }
}

import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { ICreatQuestion } from '@/interfaces/domain/useCases/questions/CreateQuestion'

export class CreateQuestionUseCase implements ICreatQuestion {
    constructor(private readonly questionsRepository: IQuestionsRepository) {}
    async create(question: IQuestion): Promise<IQuestion> {
        const created = await this.questionsRepository.createQuestion(question)
        return created
    }
}

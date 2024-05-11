import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IGetQuestionsCategoryByID } from '@/interfaces/domain/useCases/questionsCategory/GetByID'

export class GetQuestionsCategoryByIdUseCase implements IGetQuestionsCategoryByID {
    constructor(private readonly categoriesRepository: IQuestionsCategoryRepository) {}
    async get(id: string): Promise<IQuestionsCategory> {
        const exists = await this.categoriesRepository.getByID(id)
        if (exists) {
            return exists
        }
        return null
    }
}

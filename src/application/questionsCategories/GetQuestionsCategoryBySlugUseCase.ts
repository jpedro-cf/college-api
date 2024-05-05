import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IGetQuestionsCategoryBySlug } from '@/interfaces/domain/useCases/questionsCategory/GetBySlug'

export class GetQuestionsCategoryBySlugUseCase implements IGetQuestionsCategoryBySlug {
    constructor(private readonly questionsCategoryRepository: IQuestionsCategoryRepository) {}
    async get(slug: string): Promise<IQuestionsCategory> {
        const exists = await this.questionsCategoryRepository.getBySlug(slug)

        if (exists) {
            return exists
        }

        return null
    }
}

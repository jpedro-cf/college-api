import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IGetQuestionsCategoryBySlug } from '@/interfaces/domain/useCases/questionsCategory/GetBySlug'

export class GetQuestionsCategoryBySlugUseCase implements IGetQuestionsCategoryBySlug {
    async get(slug: string): Promise<IQuestionsCategory> {
        throw new Error('Method not implemented.')
    }
}

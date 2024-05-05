import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { ICreateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/CreateQuestionsCategory'

export class CreateQuestionsCategoryUseCase implements ICreateQuestionsCategory {
    constructor(private readonly questionsCategoryRepository: IQuestionsCategoryRepository) {}
    async create(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
        const created = await this.questionsCategoryRepository.createCategory(title, image)

        return created
    }
}

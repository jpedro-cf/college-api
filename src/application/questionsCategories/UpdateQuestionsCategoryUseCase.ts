import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IUpdateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/UpdateQuestionsCategory'

export class UpdateQuestionsCategoryUseCase implements IUpdateQuestionsCategory {
    constructor(private readonly questionsCategoryRepository: IQuestionsCategoryRepository) {}
    async update(data: IQuestionsCategory): Promise<IQuestionsCategory> {
        const exists = await this.questionsCategoryRepository.getByID(data.id)
        if (!exists) {
            throw new Error('Categoria com esse ID não existe.')
        }

        exists.title = data.title
        exists.slug = data.slug
        exists.image = data.image

        const updated = await this.questionsCategoryRepository.updateCategory(exists)
        return updated ?? null
    }
}

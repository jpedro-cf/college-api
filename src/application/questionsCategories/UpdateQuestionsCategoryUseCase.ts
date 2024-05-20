import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IUpdateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/UpdateQuestionsCategory'
import { AlreadyInUseError } from '@/utils/customErrors'

export class UpdateQuestionsCategoryUseCase implements IUpdateQuestionsCategory {
    constructor(private readonly questionsCategoryRepository: IQuestionsCategoryRepository) {}
    async update(data: Omit<IQuestionsCategory, 'created_at'>): Promise<IQuestionsCategory> {
        const in_use = await this.questionsCategoryRepository.getBySlug(data.slug)

        if (in_use) {
            throw new AlreadyInUseError('Categoria com esse slug já existe.')
        }

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

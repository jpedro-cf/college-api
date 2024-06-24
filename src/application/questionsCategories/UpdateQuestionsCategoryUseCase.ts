import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IUpdateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/UpdateQuestionsCategory'
import { AlreadyInUseError } from '@/utils/customErrors'

export class UpdateQuestionsCategoryUseCase implements IUpdateQuestionsCategory {
    constructor(private readonly questionsCategoryRepository: IQuestionsCategoryRepository) {}
    async update(data: Omit<IQuestionsCategory, 'createdAt' | 'updatedAt'>): Promise<IQuestionsCategory> {
        const exists = await this.questionsCategoryRepository.getByField('slug', data.slug)

        if (!exists) {
            throw new AlreadyInUseError('Categoria com esse ID não existe.')
        }

        const slug_exists = await this.questionsCategoryRepository.getByField('slug', data.slug)
        if (slug_exists) {
            throw new AlreadyInUseError('Categoria com esse slug já existe.')
        }

        exists.title = data.title
        exists.slug = data.slug
        exists.image = data.image

        const updated = await this.questionsCategoryRepository.updateCategory(exists)
        return updated ?? null
    }
}

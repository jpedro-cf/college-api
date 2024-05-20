import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { ICreateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/CreateQuestionsCategory'
import { AlreadyInUseError } from '@/utils/customErrors'

export class CreateQuestionsCategoryUseCase implements ICreateQuestionsCategory {
    constructor(private readonly questionsCategoryRepository: IQuestionsCategoryRepository) {}
    async create(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
        const exists = await this.questionsCategoryRepository.getBySlug(slug)
        if (exists) {
            throw new AlreadyInUseError('Categoria com esse slug já existe.')
        }
        const created = await this.questionsCategoryRepository.createCategory(title, slug, image)

        return created
    }
}

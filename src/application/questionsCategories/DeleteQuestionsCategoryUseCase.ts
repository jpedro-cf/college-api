import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IDeleteQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/DeleteQuestionsCategory'
import { NotFoundError } from '@/utils/customErrors'

export class DeleteQuestionsCategoryUseCase implements IDeleteQuestionsCategory {
    constructor(private readonly questionsCategoryRepository: IQuestionsCategoryRepository) {}
    async delete(id: string): Promise<boolean> {
        const exists = await this.questionsCategoryRepository.getByID(id)
        if (!exists) {
            throw new NotFoundError('Categoria com esse ID não existe.')
        }

        const deleted = await this.questionsCategoryRepository.deleteCategory(id)
        return deleted
    }
}

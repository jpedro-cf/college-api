import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import {
    IGetQuestionsCategories,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export class GetQuestionsCategoryUseCase implements IGetQuestionsCategories {
    constructor(private readonly questionCategoryRepository: IQuestionsCategoryRepository) {}

    async get(data?: IGetQuestionsCategoriesDTO): Promise<IQuestionsCategory[]> {
        const categories = await this.questionCategoryRepository.getAll(data)
        return null
    }
}

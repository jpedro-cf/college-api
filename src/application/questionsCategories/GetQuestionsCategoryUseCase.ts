import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategories,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export class GetQuestionsCategoryUseCase implements IGetQuestionsCategories {
    constructor(private readonly questionCategoryRepository: IQuestionsCategoryRepository) {}

    async get(data: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse> {
        const response = await this.questionCategoryRepository.getAll({
            search: data.search ?? '',
            order: data.order ?? 'desc',
            current_page: data.current_page ?? 1,
            per_page: data.per_page ?? 9
        })
        return response
    }
}

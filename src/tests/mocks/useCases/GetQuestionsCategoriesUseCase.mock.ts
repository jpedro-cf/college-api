import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategories,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { makeFakeCategory } from '../models/CategoryModel.mock'

export const makeFakeGetQuestionsCategoies = (): IGetQuestionsCategories => {
    class GetQuestionsCategoiesStub implements IGetQuestionsCategories {
        async get(data?: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse> {
            return Promise.resolve({
                categories: [makeFakeCategory()],
                pages: 1
            })
        }
    }
    return new GetQuestionsCategoiesStub()
}

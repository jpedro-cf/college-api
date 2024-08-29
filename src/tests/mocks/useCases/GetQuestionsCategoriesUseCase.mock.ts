import {
    IGetAllCategoriesResponse,
    IGetCategories,
    IGetCategoriesDTO
} from '@/interfaces/domain/useCases/categories/GetCategories'
import { makeFakeCategory } from '../models/CategoryModel.mock'

export const makeFakeGetQuestionsCategoies = (): IGetCategories => {
    class GetQuestionsCategoiesStub implements IGetCategories {
        async execute(data?: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse> {
            return Promise.resolve({
                categories: [makeFakeCategory()],
                pages: 1
            })
        }
    }
    return new GetQuestionsCategoiesStub()
}

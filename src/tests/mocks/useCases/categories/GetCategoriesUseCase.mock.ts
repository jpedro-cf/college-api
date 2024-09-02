import {
    IGetAllCategoriesResponse,
    IGetCategories,
    IGetCategoriesDTO
} from '@/interfaces/domain/useCases/categories/GetCategories'
import { makeFakeCategory } from '../../models/CategoryModel.mock'

export const makeFakeGetCategories = (): IGetCategories => {
    class Stub implements IGetCategories {
        async execute(data?: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse> {
            return Promise.resolve({
                categories: [makeFakeCategory()],
                pages: 1
            })
        }
    }
    return new Stub()
}

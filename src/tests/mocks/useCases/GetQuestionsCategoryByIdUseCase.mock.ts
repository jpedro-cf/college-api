import { IGetCategoryByID } from '@/interfaces/domain/useCases/categories/GetByID'
import { makeFakeCategory } from '../models/CategoryModel.mock'
import { ICategory } from '@/domain/Category'

export const makeFakeGetQuestionsCategoryByIdUseCase = (): IGetCategoryByID => {
    class GetQuestionsCategoryByIdStub implements IGetCategoryByID {
        async execute(id: string): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
    }
    return new GetQuestionsCategoryByIdStub()
}

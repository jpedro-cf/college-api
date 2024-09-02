import { IGetCategoryByID } from '@/interfaces/domain/useCases/categories/GetByID'
import { makeFakeCategory } from '../../models/CategoryModel.mock'
import { ICategory } from '@/domain/Category'

export const makeFakeGetCategoryByIdUseCase = (): IGetCategoryByID => {
    class Stub implements IGetCategoryByID {
        async execute(id: string): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
    }
    return new Stub()
}

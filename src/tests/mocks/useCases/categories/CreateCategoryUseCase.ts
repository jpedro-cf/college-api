import { ICategory } from '@/domain/Category'
import { ICreateCategory } from '@/interfaces/domain/useCases/categories/CreateCategory'
import { makeFakeCategory } from '../../models/CategoryModel.mock'

export const makeFakeCreateCategoryUseCase = (): ICreateCategory => {
    class Stub implements ICreateCategory {
        async execute(title: string, slug: string): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
    }
    return new Stub()
}

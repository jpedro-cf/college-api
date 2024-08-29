import { ICategory } from '@/domain/Category'
import { ICreateCategory } from '@/interfaces/domain/useCases/categories/CreateCategory'
import { makeFakeCategory } from '../models/CategoryModel.mock'

export const makeFakeCreateQuestionsCategoryUseCase = (): ICreateCategory => {
    class CreateQuestionsCategoryUseCaseStub implements ICreateCategory {
        async create(title: string, slug: string, image?: string): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
    }
    return new CreateQuestionsCategoryUseCaseStub()
}

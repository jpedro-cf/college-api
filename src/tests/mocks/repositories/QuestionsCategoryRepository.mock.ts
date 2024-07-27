import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { makeFakeCategory } from '../models/CategoryModel.mock'
import { ICategory } from '@/domain/Category'
import { TFieldQuery } from '@/interfaces/application/repositories/BaseRepository'
import { IGetCategoriesDTO, IGetAllCategoriesResponse } from '@/interfaces/domain/useCases/categories/GetCategories'

export const makeFakeCategoryRepo = (): ICategoryRepository => {
    class CategoryRepo implements ICategoryRepository {
        async getAllWithFilters(data: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse> {
            return Promise.resolve({ categories: [makeFakeCategory()], pages: 1 })
        }
        async create(data: Partial<ICategory>): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async getOneByFields(query: TFieldQuery<ICategory>): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
        async update(id: string, data: TFieldQuery<ICategory>): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
        async getAll(): Promise<ICategory[]> {
            return Promise.resolve([makeFakeCategory()])
        }
    }
    return new CategoryRepo()
}

import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { makeFakeCategory } from '../models/CategoryModel.mock'
import { ICategory } from '@/domain/Category'
import {
    IPaginatedResult,
    IQuery,
    TFieldQuery,
    TFiltersQuery
} from '@/interfaces/application/repositories/BaseRepository'
import { IGetCategoriesDTO, IGetAllCategoriesResponse } from '@/interfaces/domain/useCases/categories/GetCategories'

export const makeFakeCategoryRepo = (): ICategoryRepository => {
    class CategoryRepo implements ICategoryRepository {
        async queryOne(query: TFiltersQuery<ICategory>): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
        async queryMany(query: IQuery<ICategory>): Promise<IPaginatedResult<ICategory>> {
            const data = {
                items: [makeFakeCategory()],
                total_items: 1,
                total_pages: 1
            }
            return Promise.resolve(data)
        }

        async create(data: Partial<ICategory>): Promise<ICategory> {
            return Promise.resolve(makeFakeCategory())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
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

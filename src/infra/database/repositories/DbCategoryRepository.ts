import { IGetAllCategoriesResponse, IGetCategoriesDTO } from '@/interfaces/domain/useCases/categories/GetCategories'
import { DbBaseRepository } from './DbBaseRepository'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { ICategory } from '@/domain/Category'
import { CategoryModel } from '../models/CategoryModel'

export class DbCategoryRepository extends DbBaseRepository<ICategory> implements ICategoryRepository {
    constructor() {
        super(CategoryModel)
    }
}

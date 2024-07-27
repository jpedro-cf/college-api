import { ICategory } from '@/domain/Category'

import { IBaseRepository } from './BaseRepository'
import { IGetAllCategoriesResponse, IGetCategoriesDTO } from '@/interfaces/domain/useCases/categories/GetCategories'

export interface ICategoryRepository extends IBaseRepository<ICategory> {
    getAllWithFilters(data: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse>
}

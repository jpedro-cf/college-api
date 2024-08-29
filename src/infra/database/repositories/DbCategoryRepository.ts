import { IGetAllCategoriesResponse, IGetCategoriesDTO } from '@/interfaces/domain/useCases/categories/GetCategories'
import { DbBaseRepository } from './DbBaseRepository'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { ICategory } from '@/domain/Category'
import { CategoryModel } from '../models/QuestionsCategoryModel'

export class DbQuestionsCategoryRepository extends DbBaseRepository<ICategory> implements ICategoryRepository {
    constructor() {
        super(CategoryModel)
    }

    async getAllWithFilters(data: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse> {
        let query = {}

        if (data && data.search) {
            query = { title: { $regex: data.search, $options: 'i' } }
        }

        const perPage = data.per_page || 10
        const currentPage = data.current_page || 1

        const totalCount = await this.model.countDocuments(query)

        const totalPages = Math.ceil(totalCount / perPage)

        const categories = await this.model
            .find(query)
            .limit(perPage)
            .skip((currentPage - 1) * perPage)
            .sort(data?.order === 'desc' ? { created_at: -1 } : { created_at: 1 })
            .exec()

        const categoriesObjects = categories.map((category) => category.toObject())
        return { categories: categoriesObjects, pages: totalPages }
    }
}

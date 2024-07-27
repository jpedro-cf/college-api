import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { QuestionsCategoryModel } from '../models/QuestionsCategoryModel'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { ObjectId } from 'mongodb'
import { DbBaseRepository } from './DbBaseRepository'

export class DbQuestionsCategoryRepository
    extends DbBaseRepository<IQuestionsCategory>
    implements IQuestionsCategoryRepository
{
    async getAllWithFilters(data: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse> {
        let query = {}

        if (data && data.search) {
            query = { title: { $regex: data.search, $options: 'i' } }
        }

        const perPage = data.per_page || 10
        const currentPage = data.current_page || 1

        const totalCount = await QuestionsCategoryModel.countDocuments(query)

        const totalPages = Math.ceil(totalCount / perPage)

        const categories = await QuestionsCategoryModel.find(query)
            .limit(perPage)
            .skip((currentPage - 1) * perPage)
            .sort(data?.order === 'desc' ? { created_at: -1 } : { created_at: 1 })
            .exec()

        const categoriesObjects = categories.map((category) => category.toObject())
        return { categories: categoriesObjects, pages: totalPages }
    }
}

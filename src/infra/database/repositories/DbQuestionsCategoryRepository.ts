import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { QuestionsCategoryModel } from '../models/QuestionsCategoryModel'
import { IGetQuestionsCategoriesDTO } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export class DbQuestionsCategoryRepository implements IQuestionsCategoryRepository {
    async getAll(data?: IGetQuestionsCategoriesDTO): Promise<IQuestionsCategory[]> {
        let query = {}

        if (data && data.search) {
            query = { title: { $regex: data.search, $options: 'i' } }
        }
        const categories = await QuestionsCategoryModel.find(query)
            .sort(data?.order === 'desc' ? { created_at: -1 } : { created_at: 1 })
            .exec()
        if (categories) {
            const categoriesObjects = categories.map((category) => category.toObject())
            return categoriesObjects
        }
        return []
    }
    async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
        const questionsCategory = new QuestionsCategoryModel({
            title,
            slug,
            image
        })
        await questionsCategory.save()
        return questionsCategory.toObject()
    }
    async getBySlug(slug: string): Promise<IQuestionsCategory> {
        const category = await QuestionsCategoryModel.findOne({
            slug: slug
        })
        if (category) {
            return category.toObject()
        }
        return null
    }
}

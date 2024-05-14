import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { QuestionsCategoryModel } from '../models/QuestionsCategoryModel'
import { IGetQuestionsCategoriesDTO } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { ObjectId } from 'mongodb'

export class DbQuestionsCategoryRepository implements IQuestionsCategoryRepository {
    async deleteCategory(id: string): Promise<boolean> {
        const deleted = await QuestionsCategoryModel.findOneAndDelete({
            _id: new ObjectId(id)
        })
        return deleted ? true : false
    }

    async getByID(id: string): Promise<IQuestionsCategory> {
        const category = await QuestionsCategoryModel.findOne({
            _id: id
        })
        if (category) {
            return category.toObject()
        }
        return null
    }

    async updateCategory(data: Omit<IQuestionsCategory, 'created_at'>): Promise<IQuestionsCategory> {
        const updatedCategory = await QuestionsCategoryModel.findOneAndUpdate(
            { _id: new ObjectId(data.id) },
            {
                $set: {
                    title: data.title,
                    slug: data.slug,
                    image: data.image
                }
            },
            { new: true }
        )

        if (updatedCategory) {
            return updatedCategory.toObject()
        }
        return null
    }
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

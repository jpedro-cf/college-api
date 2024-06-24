import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { QuestionsCategoryModel } from '../models/QuestionsCategoryModel'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { ObjectId } from 'mongodb'

export class DbQuestionsCategoryRepository implements IQuestionsCategoryRepository {
    async deleteCategory(id: string): Promise<boolean> {
        const deleted = await QuestionsCategoryModel.findOneAndDelete({
            _id: new ObjectId(id)
        })
        return deleted ? true : false
    }

    async updateCategory(data: Omit<IQuestionsCategory, 'createdAt' | 'updatedAt'>): Promise<IQuestionsCategory> {
        const updatedCategory = await QuestionsCategoryModel.findOneAndUpdate(
            { _id: new ObjectId(data._id) },
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
    async getAll(data: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse> {
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
    async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
        const questionsCategory = new QuestionsCategoryModel({
            title,
            slug,
            image,
            created_at: new Date()
        })
        await questionsCategory.save()
        return questionsCategory.toObject()
    }
    async getByField(field: keyof IQuestionsCategory, value: any): Promise<IQuestionsCategory> {
        const query = { [field]: value }

        const category = await QuestionsCategoryModel.findOne(query)

        if (category) {
            return category.toObject()
        }
        return null
    }
}

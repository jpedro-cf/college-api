import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { QuestionsCategoryModel } from '../models/QuestionsCategoryModel'
import { IGetQuestionsCategoriesDTO } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { ObjectId } from 'mongodb'

export class DbQuestionsCategoryRepository implements IQuestionsCategoryRepository {
    async getByID(id: string): Promise<IQuestionsCategory> {
        const category = await QuestionsCategoryModel.findOne({
            _id: id
        })
        if (category) {
            return category.toObject()
        }
        return null
    }
    async updateCategory(data: IQuestionsCategory): Promise<IQuestionsCategory> {
        const updatedCategory = await QuestionsCategoryModel.findOneAndUpdate(
            { _id: new ObjectId(data.id) }, // ou { _id: data.id } se estiver usando o id
            {
                $set: {
                    title: data.title,
                    slug: data.slug,
                    image: data.image
                }
            }, // Os dados que você quer atualizar
            { new: true } // Para retornar o documento atualizado
        )

        console.log(updatedCategory)
        if (updatedCategory) {
            return updatedCategory.toObject()
        } else {
            return null // Retorna null se a categoria não for encontrada
        }
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

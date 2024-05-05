import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { QuestionsCategoryModel } from '../models/QuestionsCategoryModel'

export class DbQuestionsCategoryRepository implements IQuestionsCategoryRepository {
    async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
        const questionsCategory = new QuestionsCategoryModel({
            title,
            slug,
            image
        })
        await questionsCategory.save()
        return {
            id: questionsCategory.id,
            title: questionsCategory.title,
            slug: questionsCategory.slug,
            image: questionsCategory.image,
            created_at: questionsCategory.created_at
        }
    }
    async getBySlug(slug: string): Promise<IQuestionsCategory> {
        const category = await QuestionsCategoryModel.findOne({
            slug: slug
        })
        if (category) {
            return {
                id: category.id,
                title: category.title,
                slug: category.slug,
                image: category.image,
                created_at: category.created_at
            }
        }
        return null
    }
}

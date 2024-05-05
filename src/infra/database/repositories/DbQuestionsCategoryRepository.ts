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
        console.log(questionsCategory)
        return questionsCategory
    }
    async getBySlug(slug: string): Promise<IQuestionsCategory> {
        throw new Error('Method not implemented.')
    }
}

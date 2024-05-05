import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'

export const makeFakeQuestionsCategoryRepo = (): IQuestionsCategoryRepository => {
    class QuestionsCategoryRepo implements IQuestionsCategoryRepository {
        async getBySlug(slug: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
        async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
    }
    return new QuestionsCategoryRepo()
}

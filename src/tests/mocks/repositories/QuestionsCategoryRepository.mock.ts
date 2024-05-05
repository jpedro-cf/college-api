import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'

export const makeFakeQuestionsCategoryRepo = (): IQuestionsCategoryRepository => {
    class QuestionsCategoryRepo implements IQuestionsCategoryRepository {
        async createCategory(title: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: 'any_id',
                title: 'title',
                image: 'image_url'
            })
        }
    }
    return new QuestionsCategoryRepo()
}

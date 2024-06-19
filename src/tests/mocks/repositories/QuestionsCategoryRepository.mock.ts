import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export const makeFakeQuestionsCategoryRepo = (): IQuestionsCategoryRepository => {
    class QuestionsCategoryRepo implements IQuestionsCategoryRepository {
        async deleteCategory(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async getByID(id: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                _id: id,
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
        updateCategory(data: IQuestionsCategory): Promise<IQuestionsCategory> {
            return Promise.resolve(data)
        }
        async getAll(data?: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse> {
            return Promise.resolve({
                categories: [
                    {
                        _id: 'any_id',
                        title: data ? data.search : 'titulo',
                        slug: 'title_category',
                        image: 'image_url',
                        created_at: new Date()
                    }
                ],
                pages: 1
            })
        }
        async getBySlug(slug: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                _id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
        async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                _id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
    }
    return new QuestionsCategoryRepo()
}

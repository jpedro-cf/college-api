import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'
import { makeFakeCategory } from '../models/CategoryModel.mock'

export const makeFakeQuestionsCategoryRepo = (): IQuestionsCategoryRepository => {
    class QuestionsCategoryRepo implements IQuestionsCategoryRepository {
        async getByField(field: keyof IQuestionsCategory, value: any): Promise<IQuestionsCategory> {
            return Promise.resolve(makeFakeCategory())
        }
        async deleteCategory(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }

        updateCategory(data: IQuestionsCategory): Promise<IQuestionsCategory> {
            return Promise.resolve(data)
        }
        async getAll(data?: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse> {
            return Promise.resolve({
                categories: [makeFakeCategory()],
                pages: 1
            })
        }

        async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve(makeFakeCategory())
        }
    }
    return new QuestionsCategoryRepo()
}

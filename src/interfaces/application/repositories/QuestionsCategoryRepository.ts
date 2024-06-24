import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export interface IQuestionsCategoryRepository {
    createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory>
    getByField(field: keyof IQuestionsCategory, value: any): Promise<IQuestionsCategory>
    getAll(data: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse>
    updateCategory(data: IQuestionsCategory): Promise<IQuestionsCategory>
    deleteCategory(id: string): Promise<boolean>
}

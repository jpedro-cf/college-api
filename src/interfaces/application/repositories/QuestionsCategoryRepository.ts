import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IGetQuestionsCategoriesDTO } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export interface IQuestionsCategoryRepository {
    createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory>
    getBySlug(slug: string): Promise<IQuestionsCategory>
    getAll(data?: IGetQuestionsCategoriesDTO): Promise<IQuestionsCategory[]>
}

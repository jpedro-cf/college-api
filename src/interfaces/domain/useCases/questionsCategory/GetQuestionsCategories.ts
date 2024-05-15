import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IGetQuestionsCategoriesDTO {
    search?: string
    order?: 'desc' | 'asc'
    current_page?: number
    per_page?: number
}
export interface IGetAllCategoriesResponse {
    categories: IQuestionsCategory[]
    pages: number
}

export interface IGetQuestionsCategories {
    get(data: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse>
}

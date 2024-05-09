import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IGetQuestionsCategoriesDTO {
    search?: string
    order?: 'desc' | 'asc'
}

export interface IGetQuestionsCategories {
    get(data?: IGetQuestionsCategoriesDTO): Promise<IQuestionsCategory[]>
}

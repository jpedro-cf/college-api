import { IQuestion } from '@/domain/Question'

export interface IGetQuestionsDTO {
    search?: string
    order?: 'desc' | 'asc'
    current_page?: number
    per_page?: number
}
export interface IGetAllQuestionsResponse {
    questions: IQuestion[]
    pages: number
}

export interface IGetQuestions {
    execute(data: IGetQuestionsDTO): Promise<IGetAllQuestionsResponse>
}

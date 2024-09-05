import { IAnswer } from '@/domain/Answer'

export interface IGetAnswersDTO {
    user_id: string
    search?: string
    order?: 'desc' | 'asc'
    current_page?: number
    per_page?: number
}
export interface IGetAllAnswersResponse {
    answers: IAnswer[]
    pages: number
}

export interface IGetAnswers {
    get(data: IGetAnswersDTO): Promise<IGetAllAnswersResponse>
    getByID(id: string): Promise<IAnswer>
}

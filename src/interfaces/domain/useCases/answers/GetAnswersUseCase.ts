import { IAnswer } from '@/domain/Answer'
import { IUser } from '@/domain/User'

export interface IGetAnswersDTO {
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

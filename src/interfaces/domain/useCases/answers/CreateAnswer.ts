import { IAnswer } from '@/domain/Answer'

export interface ICreateAnswerDTO {
    question_id: string
    answer_id: number
    user_id: string
}

export interface ICreateAnswer {
    execute(data: ICreateAnswerDTO): Promise<IAnswer>
}

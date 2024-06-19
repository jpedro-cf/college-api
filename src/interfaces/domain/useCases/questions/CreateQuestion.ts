import { IQuestion } from '@/domain/Question'

export interface ICreateQuestionResponse extends IQuestion {
    category_title: string
}

export interface ICreateQuestion {
    create(question: Omit<IQuestion, 'id'>, correct: number): Promise<ICreateQuestionResponse>
}

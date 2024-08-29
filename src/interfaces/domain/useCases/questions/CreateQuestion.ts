import { IQuestion } from '@/domain/Question'

export interface ICreateQuestionResponse extends IQuestion {
    category_title: string
}

export interface ICreateQuestion {
    execute(
        question: Omit<IQuestion, '_id' | 'createdAt' | 'updatedAt'>,
        correct: number
    ): Promise<ICreateQuestionResponse>
}

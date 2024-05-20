import { IQuestion } from '@/domain/Question'

export interface IQuestionSchema extends IQuestion {
    correct_answer_id: number
}

import { IQuestion } from '@/domain/Question'
import { IQuestionSchema } from '../schemas/QuestionSchema'

export interface IQuestionsRepository {
    createQuestion(question: IQuestion, correct: number): Promise<IQuestionSchema>
}

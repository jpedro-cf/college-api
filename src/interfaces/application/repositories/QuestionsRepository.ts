import { IQuestion } from '@/domain/Question'

export interface IQuestionsRepository {
    createQuestion(question: IQuestion): Promise<IQuestion>
}

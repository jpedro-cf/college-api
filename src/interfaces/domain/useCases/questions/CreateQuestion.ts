import { IQuestion } from '@/domain/Question'

export interface ICreateQuestion {
    create(question: IQuestion, correct: number): Promise<IQuestion>
}

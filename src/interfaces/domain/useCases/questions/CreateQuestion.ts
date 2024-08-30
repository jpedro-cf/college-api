import { IQuestion } from '@/domain/Question'

export interface ICreateQuestion {
    execute(question: Partial<IQuestion>, correct: number): Promise<IQuestion>
}

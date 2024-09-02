import { IQuestion } from '@/domain/Question'
import { ICreateQuestion } from '@/interfaces/domain/useCases/questions/CreateQuestion'
import { makeFakeQuestion } from '../../models/QuestionModel.mock'

export const makeFakeCreateQuestion = (): ICreateQuestion => {
    class Stub implements ICreateQuestion {
        async execute(question: Partial<IQuestion>, correct: number): Promise<IQuestion> {
            return Promise.resolve(makeFakeQuestion())
        }
    }
    return new Stub()
}

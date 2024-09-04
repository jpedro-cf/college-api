import { IQuestion } from '@/domain/Question'
import { IUpdateQuestion } from '@/interfaces/domain/useCases/questions/UpdateQuestion'
import { makeFakeQuestion } from '../../models/QuestionModel.mock'

export const makeFakeUpdateQuestion = (): IUpdateQuestion => {
    class Stub implements IUpdateQuestion {
        async execute(id: string, data: Partial<IQuestion>): Promise<IQuestion> {
            return Promise.resolve(makeFakeQuestion())
        }
    }
    return new Stub()
}

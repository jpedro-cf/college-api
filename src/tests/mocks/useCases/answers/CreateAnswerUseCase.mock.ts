import { IAnswer } from '@/domain/Answer'
import { ICreateAnswer, ICreateAnswerDTO } from '@/interfaces/domain/useCases/answers/CreateAnswer'
import { makeFakeAnswerModel } from '../../models/AnswerModel.mock'

export const makeFakeCreateAnswer = (): ICreateAnswer => {
    class Stub implements ICreateAnswer {
        async execute(data: ICreateAnswerDTO): Promise<IAnswer> {
            return Promise.resolve(makeFakeAnswerModel())
        }
    }
    return new Stub()
}

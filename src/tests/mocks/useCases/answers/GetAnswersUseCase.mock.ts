import { IAnswer } from '@/domain/Answer'
import {
    IGetAllAnswersResponse,
    IGetAnswers,
    IGetAnswersDTO
} from '@/interfaces/domain/useCases/answers/GetAnswersUseCase'
import { makeFakeAnswerModel } from '../../models/AnswerModel.mock'

export const makeFakeGetAnswers = (): IGetAnswers => {
    class Stub implements IGetAnswers {
        async get(data: IGetAnswersDTO): Promise<IGetAllAnswersResponse> {
            return Promise.resolve({
                answers: [makeFakeAnswerModel()],
                pages: 1
            })
        }
        async getByID(id: string): Promise<IAnswer> {
            return Promise.resolve(makeFakeAnswerModel())
        }
    }
    return new Stub()
}

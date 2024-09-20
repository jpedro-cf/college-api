import {
    IGetAllQuestionsResponse,
    IGetQuestions,
    IGetQuestionsDTO
} from '@/interfaces/domain/useCases/questions/GetQuestions'
import { makeFakeQuestion } from '../../models/QuestionModel.mock'
import { IQuestion } from '@/domain/Question'

export const makeFakeGetQuestions = (): IGetQuestions => {
    class Stub implements IGetQuestions {
        async byId(id: string): Promise<IQuestion> {
            return Promise.resolve(makeFakeQuestion())
        }
        async execute(data: IGetQuestionsDTO): Promise<IGetAllQuestionsResponse> {
            return Promise.resolve({
                questions: [makeFakeQuestion()],
                pages: 1
            })
        }
    }
    return new Stub()
}

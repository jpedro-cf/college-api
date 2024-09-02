import {
    IGetAllQuestionsResponse,
    IGetQuestions,
    IGetQuestionsDTO
} from '@/interfaces/domain/useCases/questions/GetQuestions'
import { makeFakeQuestion } from '../../models/QuestionModel.mock'

export const makeFakeGetQuestions = (): IGetQuestions => {
    class Stub implements IGetQuestions {
        async execute(data: IGetQuestionsDTO): Promise<IGetAllQuestionsResponse> {
            return Promise.resolve({
                questions: [makeFakeQuestion()],
                pages: 1
            })
        }
    }
    return new Stub()
}

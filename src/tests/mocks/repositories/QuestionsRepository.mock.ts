import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { makeFakeQuestion } from '../models/QuestionModel.mock'

export const makeFakeQuestionsRepository = (): IQuestionsRepository => {
    class QuestionsRepositoryStub implements IQuestionsRepository {
        async createQuestion(question: IQuestion): Promise<IQuestion> {
            return Promise.resolve(makeFakeQuestion())
        }
    }
    return new QuestionsRepositoryStub()
}

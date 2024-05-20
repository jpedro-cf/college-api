import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { makeFakeQuestion } from '../models/QuestionModel.mock'
import { IQuestionSchema } from '@/interfaces/application/schemas/QuestionSchema'

export const makeFakeQuestionsRepository = (): IQuestionsRepository => {
    class QuestionsRepositoryStub implements IQuestionsRepository {
        async createQuestion(question: IQuestion): Promise<IQuestionSchema> {
            return Promise.resolve(makeFakeQuestion())
        }
    }
    return new QuestionsRepositoryStub()
}

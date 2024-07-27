import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { makeFakeQuestion } from '../models/QuestionModel.mock'
import { IQuestionSchema } from '@/interfaces/application/schemas/QuestionSchema'
import { TFieldQuery } from '@/interfaces/application/repositories/BaseRepository'

export const makeFakeQuestionsRepository = (): IQuestionsRepository => {
    class QuestionsRepositoryStub implements IQuestionsRepository {
        async create(data: Partial<IQuestionSchema>): Promise<IQuestionSchema> {
            return Promise.resolve(makeFakeQuestion())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async getOneByFields(query: TFieldQuery<IQuestionSchema>): Promise<IQuestionSchema> {
            return Promise.resolve(makeFakeQuestion())
        }
        async update(id: string, data: TFieldQuery<IQuestionSchema>): Promise<IQuestionSchema> {
            return Promise.resolve(makeFakeQuestion())
        }
        async getAll(): Promise<IQuestionSchema[]> {
            return Promise.resolve([makeFakeQuestion()])
        }
    }
    return new QuestionsRepositoryStub()
}

import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { makeFakeQuestion } from '../models/QuestionModel.mock'
import { IQuestionSchema } from '@/interfaces/application/schemas/QuestionSchema'
import {
    IPaginatedResult,
    IQuery,
    TFieldQuery,
    TFiltersQuery
} from '@/interfaces/application/repositories/BaseRepository'

export const makeFakeQuestionsRepository = (): IQuestionsRepository => {
    class QuestionsRepositoryStub implements IQuestionsRepository {
        async queryOne(query: TFiltersQuery<IQuestionSchema>): Promise<IQuestionSchema> {
            return Promise.resolve(makeFakeQuestion())
        }
        async queryMany(query: IQuery<IQuestionSchema>): Promise<IPaginatedResult<IQuestionSchema>> {
            const data = {
                items: [makeFakeQuestion()],
                total_items: 1,
                total_pages: 1
            }
            return Promise.resolve(data)
        }
        async create(data: Partial<IQuestionSchema>): Promise<IQuestionSchema> {
            return Promise.resolve(makeFakeQuestion())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
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
